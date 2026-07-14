import { describe, it, expect, vi } from "vitest";
import { load } from "./+page.server";

describe("load", () => {
	const RELEASES_URL = "https://github.com/57471C/speedDF/releases";

	it("should return correct download URLs when matching assets exist", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				tag_name: "v1.0.0",
				assets: [
					{ name: "speeddf-v1.0.0.exe", browser_download_url: "https://example.com/speeddf.exe" },
					{ name: "speeddf-v1.0.0.dmg", browser_download_url: "https://example.com/speeddf.dmg" },
					{ name: "speeddf-v1.0.0.AppImage", browser_download_url: "https://example.com/speeddf.AppImage" }
				]
			})
		});

		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as any);

		expect(mockSetHeaders).toHaveBeenCalledWith({
			"cache-control": "public, max-age=3600, s-maxage=3600",
		});

		expect(result).toEqual({
			winDownload: "https://example.com/speeddf.exe",
			macDownload: "https://example.com/speeddf.dmg",
			linuxDownload: "https://example.com/speeddf.AppImage",
			version: "v1.0.0"
		});
	});

	it("should return default RELEASES_URL for platforms missing expected file extensions", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				tag_name: "v1.0.1",
				assets: [
					{ name: "speeddf-v1.0.1.tar.gz", browser_download_url: "https://example.com/speeddf.tar.gz" },
					// Missing .exe, .dmg, .AppImage
				]
			})
		});

		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as any);

		expect(result).toEqual({
			winDownload: RELEASES_URL,
			macDownload: RELEASES_URL,
			linuxDownload: RELEASES_URL,
			version: "v1.0.1"
		});
	});

	it("should fallback to safe values when fetch fails", async () => {
		const mockFetch = vi.fn().mockRejectedValue(new Error("Network Error"));
		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as any);

		expect(result).toEqual({
			winDownload: RELEASES_URL,
			macDownload: RELEASES_URL,
			linuxDownload: RELEASES_URL,
			version: "latest"
		});
	});

	it("should fallback to safe values when API returns non-ok response", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 403,
			statusText: "Forbidden"
		});
		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as any);

		expect(result).toEqual({
			winDownload: RELEASES_URL,
			macDownload: RELEASES_URL,
			linuxDownload: RELEASES_URL,
			version: "latest"
		});
	});

	it("should handle missing tag_name correctly", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				assets: []
			})
		});
		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as any);

		expect(result).toEqual({
			winDownload: RELEASES_URL,
			macDownload: RELEASES_URL,
			linuxDownload: RELEASES_URL,
			version: "v0.0.0"
		});
	});

	it("should handle undefined assets correctly", async () => {
		const mockFetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({
				tag_name: "v1.0.0"
			})
		});
		const mockSetHeaders = vi.fn();

		const result = await load({
			fetch: mockFetch,
			setHeaders: mockSetHeaders,
		} as any);

		expect(result).toEqual({
			winDownload: RELEASES_URL,
			macDownload: RELEASES_URL,
			linuxDownload: RELEASES_URL,
			version: "v1.0.0"
		});
	});
});
