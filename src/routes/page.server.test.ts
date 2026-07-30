import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { load } from "./+page.server";

describe("load", () => {
	let mockDateNowVal = 0;
	beforeEach(() => {
		vi.spyOn(Date, "now").mockImplementation(() => {
			mockDateNowVal += 10000000; // Increment by a large amount (more than 5 mins) to expire cache
			return mockDateNowVal;
		});
	});
	afterEach(() => {
		vi.restoreAllMocks();
	});

	const RELEASES_URL = "https://github.com/57471C/speedDF/releases";
	const RELEASES_LATEST = `${RELEASES_URL}/latest`;

	it("should return correct download URLs when matching assets exist", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				tag_name: "v1.0.0",
				assets: [
					{ name: "speeddf-v1.0.0.exe", browser_download_url: "https://example.com/speeddf.exe" },
					{ name: "speeddf-v1.0.0.dmg", browser_download_url: "https://example.com/speeddf.dmg" },
					{
						name: "speeddf-v1.0.0.AppImage",
						browser_download_url: "https://example.com/speeddf.AppImage",
					},
					{ name: "speeddf_1.0.0_amd64.deb", browser_download_url: "https://example.com/speeddf.deb" },
					{ name: "speeddf-1.0.0-1.x86_64.rpm", browser_download_url: "https://example.com/speeddf.rpm" },
				],
			}),
		});

		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as unknown as Parameters<typeof load>[0]);

		expect(mockSetHeaders).toHaveBeenCalledWith({
			"cache-control": "public, max-age=900, s-maxage=900",
		});

		expect(result).toEqual({
			winDownload: "https://example.com/speeddf.exe",
			macDownload: "https://example.com/speeddf.dmg",
			linuxAppImage: "https://example.com/speeddf.AppImage",
			linuxDeb: "https://example.com/speeddf.deb",
			linuxRpm: "https://example.com/speeddf.rpm",
			version: "v1.0.0",
		});
	});

	it("should prefer AppImage as linuxAppImage and leave missing formats empty", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				tag_name: "v1.2.0",
				assets: [
					{ name: "setup.exe", browser_download_url: "https://example.com/win.exe" },
					{ name: "app.dmg", browser_download_url: "https://example.com/mac.dmg" },
					{
						name: "speeddf_1.2.0_amd64.AppImage",
						browser_download_url: "https://example.com/app.AppImage",
					},
					{ name: "speeddf_1.2.0_amd64.deb", browser_download_url: "https://example.com/app.deb" },
				],
			}),
		});

		const result = await load({
			fetch: mockFetch,
			setHeaders: vi.fn(),
		} as unknown as Parameters<typeof load>[0]);

		expect(result).toMatchObject({
			linuxAppImage: "https://example.com/app.AppImage",
			linuxDeb: "https://example.com/app.deb",
			linuxRpm: "",
		});
	});

	it("should return default RELEASES_URL for platforms missing expected file extensions", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				tag_name: "v1.0.1",
				assets: [
					{
						name: "speeddf-v1.0.1.tar.gz",
						browser_download_url: "https://example.com/speeddf.tar.gz",
					},
					// Missing .exe, .dmg, .AppImage
				],
			}),
		});

		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as unknown as Parameters<typeof load>[0]);

		expect(result).toEqual({
			winDownload: RELEASES_LATEST,
			macDownload: "https://example.com/speeddf.tar.gz",
			linuxAppImage: RELEASES_LATEST,
			linuxDeb: "",
			linuxRpm: "",
			version: "v1.0.1",
		});
	});

	it("should fallback to safe values when fetch fails", async () => {
		const mockFetch = vi.fn().mockRejectedValue(new Error("Network Error"));
		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as unknown as Parameters<typeof load>[0]);

		expect(result).toEqual({
			winDownload: RELEASES_LATEST,
			macDownload: RELEASES_LATEST,
			linuxAppImage: RELEASES_LATEST,
			linuxDeb: "",
			linuxRpm: "",
			version: "v1.0.2",
		});
	});

	it("should fallback to safe values when API returns non-ok response", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 403,
			statusText: "Forbidden",
		});
		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as unknown as Parameters<typeof load>[0]);

		expect(result).toEqual({
			winDownload: RELEASES_LATEST,
			macDownload: RELEASES_LATEST,
			linuxAppImage: RELEASES_LATEST,
			linuxDeb: "",
			linuxRpm: "",
			version: "v1.0.2",
		});
	});

	it("should handle missing tag_name correctly", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				assets: [],
			}),
		});
		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as unknown as Parameters<typeof load>[0]);

		expect(result).toEqual({
			winDownload: RELEASES_LATEST,
			macDownload: RELEASES_LATEST,
			linuxAppImage: RELEASES_LATEST,
			linuxDeb: "",
			linuxRpm: "",
			version: "v1.0.2",
		});
	});

	it("should handle undefined assets correctly", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				tag_name: "v1.0.0",
			}),
		});
		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as unknown as Parameters<typeof load>[0]);

		expect(result).toEqual({
			winDownload: RELEASES_LATEST,
			macDownload: RELEASES_LATEST,
			linuxAppImage: RELEASES_LATEST,
			linuxDeb: "",
			linuxRpm: "",
			version: "v1.0.0",
		});
	});
});
