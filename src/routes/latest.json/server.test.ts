import { beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./+server";

describe("GET /latest.json", () => {
	beforeEach(() => {
		vi.restoreAllMocks();
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
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
			request: mockRequest,
		} as any);

		expect(mockFetch).toHaveBeenCalledWith(
			"https://api.github.com/repos/57471C/speedDF/releases/latest",
			{
				headers: { "User-Agent": "speeddf-web-updater" },
			},
		);

		expect(response.status).toBe(500);

		const data = await response.json();
		expect(data).toEqual({ error: "Failed to fetch release from GitHub" });
	});
});
