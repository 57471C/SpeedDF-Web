import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GITHUB_API_LATEST_RELEASE_URL } from "$lib/constants";
import { GET } from "./+server";
import type { RequestEvent } from "./$types";

describe("GET /latest.json", () => {
	let currentTime = new Date("2024-01-01T00:00:00Z").getTime();

	beforeEach(() => {
		vi.restoreAllMocks();
		vi.useFakeTimers();
		// Advance time by a year for each test to ensure fresh cache state
		currentTime += 365 * 24 * 60 * 60 * 1000;
		vi.setSystemTime(new Date(currentTime));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should return a 500 error when GitHub API fetch fails with a non-ok response", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: false,
		});

		const mockSetHeaders = vi.fn();
		const mockRequest = {
			headers: {
				get: vi.fn().mockReturnValue(null),
			},
		};

		const response = await GET({
			fetch: mockFetch as unknown as typeof fetch,
			setHeaders: mockSetHeaders,
			request: mockRequest as unknown as Request,
		} as unknown as RequestEvent);

		expect(mockFetch).toHaveBeenCalledWith(GITHUB_API_LATEST_RELEASE_URL, {
			headers: { "User-Agent": "speeddf-web-updater" },
		});

		expect(response.status).toBe(500);

		const data = await response.json();
		expect(data).toEqual({ error: "Failed to fetch release from GitHub" });
	});

	it("should return 404 when latest.json asset is missing from release", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValue({
				assets: [{ name: "other-file.zip" }],
			}),
		});

		const mockSetHeaders = vi.fn();
		const mockRequest = { headers: { get: vi.fn().mockReturnValue(null) } };

		const response = await GET({
			fetch: mockFetch as unknown as typeof fetch,
			setHeaders: mockSetHeaders,
			request: mockRequest as unknown as Request,
		} as unknown as RequestEvent);

		expect(response.status).toBe(404);
		const data = await response.json();
		expect(data).toEqual({
			error: "latest.json file not found in the latest GitHub release assets",
		});
	});

	it("should return 500 when asset download fails", async () => {
		const mockFetch = vi.fn().mockImplementation((url: string) => {
			if (url === GITHUB_API_LATEST_RELEASE_URL) {
				return Promise.resolve({
					ok: true,
					json: () =>
						Promise.resolve({
							assets: [
								{ name: "latest.json", browser_download_url: "https://example.com/latest.json" },
							],
						}),
				});
			} else if (url === "https://example.com/latest.json") {
				return Promise.resolve({ ok: false });
			}
			return Promise.reject(new Error(`Unexpected fetch to ${url}`));
		});

		const mockSetHeaders = vi.fn();
		const mockRequest = { headers: { get: vi.fn().mockReturnValue(null) } };

		const response = await GET({
			fetch: mockFetch as unknown as typeof fetch,
			setHeaders: mockSetHeaders,
			request: mockRequest as unknown as Request,
		} as unknown as RequestEvent);

		expect(response.status).toBe(500);
		const data = await response.json();
		expect(data).toEqual({ error: "Failed to download asset data payload" });
	});

	it("should return 200 with updater data on successful fetch", async () => {
		const mockUpdaterData = { version: "1.0.0", notes: "Test release" };
		const mockFetch = vi.fn().mockImplementation((url: string) => {
			if (url === GITHUB_API_LATEST_RELEASE_URL) {
				return Promise.resolve({
					ok: true,
					json: () =>
						Promise.resolve({
							assets: [
								{ name: "latest.json", browser_download_url: "https://example.com/latest.json" },
							],
						}),
				});
			} else if (url === "https://example.com/latest.json") {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockUpdaterData),
				});
			}
			return Promise.reject(new Error(`Unexpected fetch to ${url}`));
		});

		const mockSetHeaders = vi.fn();
		const mockRequest = { headers: { get: vi.fn().mockReturnValue(null) } };

		const response = await GET({
			fetch: mockFetch as unknown as typeof fetch,
			setHeaders: mockSetHeaders,
			request: mockRequest as unknown as Request,
		} as unknown as RequestEvent);

		expect(response.status).toBe(200);
		const data = await response.json();
		expect(data).toEqual(mockUpdaterData);
		expect(mockSetHeaders).toHaveBeenCalledWith({ "cache-control": "public, max-age=300" });
	});

	it("should use cached download URL on subsequent requests", async () => {
		const mockUpdaterData = { version: "1.0.0", notes: "Test release" };
		const mockFetch = vi.fn().mockImplementation((url: string) => {
			if (url === GITHUB_API_LATEST_RELEASE_URL) {
				return Promise.resolve({
					ok: true,
					json: () =>
						Promise.resolve({
							assets: [
								{ name: "latest.json", browser_download_url: "https://example.com/latest.json" },
							],
						}),
				});
			} else if (url === "https://example.com/latest.json") {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve(mockUpdaterData),
				});
			}
			return Promise.reject(new Error(`Unexpected fetch to ${url}`));
		});

		const mockSetHeaders = vi.fn();
		const mockRequest = { headers: { get: vi.fn().mockReturnValue(null) } };

		// First request (cache miss)
		const response1 = await GET({
			fetch: mockFetch as unknown as typeof fetch,
			setHeaders: mockSetHeaders,
			request: mockRequest as unknown as Request,
		} as unknown as RequestEvent);
		expect(response1.status).toBe(200);
		expect(mockFetch).toHaveBeenCalledTimes(2);

		// Advance time, but still within TTL (e.g. 1 minute later)
		vi.advanceTimersByTime(60 * 1000);

		mockFetch.mockClear();

		// Second request (cache hit)
		const response2 = await GET({
			fetch: mockFetch as unknown as typeof fetch,
			setHeaders: mockSetHeaders,
			request: mockRequest as unknown as Request,
		} as unknown as RequestEvent);
		expect(response2.status).toBe(200);
		// Should only call the asset URL, not the GitHub release API
		expect(mockFetch).toHaveBeenCalledTimes(1);
		expect(mockFetch).toHaveBeenCalledWith("https://example.com/latest.json");

		// Advance time past TTL
		vi.advanceTimersByTime(5 * 60 * 1000);

		mockFetch.mockClear();

		// Third request (cache miss)
		const response3 = await GET({
			fetch: mockFetch as unknown as typeof fetch,
			setHeaders: mockSetHeaders,
			request: mockRequest as unknown as Request,
		} as unknown as RequestEvent);
		expect(response3.status).toBe(200);
		expect(mockFetch).toHaveBeenCalledTimes(2);
	});

	it("should handle exceptions and return 500 Internal Server Error", async () => {
		const mockFetch = vi.fn().mockRejectedValue(new Error("Network Error"));
		const mockSetHeaders = vi.fn();
		const mockRequest = { headers: { get: vi.fn().mockReturnValue(null) } };

		// Spy on console.error to keep test output clean
		const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

		const response = await GET({
			fetch: mockFetch as unknown as typeof fetch,
			setHeaders: mockSetHeaders,
			request: mockRequest as unknown as Request,
		} as unknown as RequestEvent);

		expect(response.status).toBe(500);
		const data = await response.json();
		expect(data).toEqual({ error: "Internal Server Error" });

		consoleSpy.mockRestore();
	});
});
