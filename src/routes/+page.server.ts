import { GITHUB_API_LATEST_RELEASE_URL, GITHUB_RELEASES_URL } from "$lib/constants";
import type { GitHubRelease } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Cache the page at the Cloudflare edge for 1 hour to protect your GitHub API limits
	setHeaders({
		"cache-control": "public, max-age=3600, s-maxage=3600",
	});
	try {
		const res = await fetch(GITHUB_API_LATEST_RELEASE_URL, {
			headers: { "User-Agent": "speeddf-web-landing-page" },
		});

		if (!res.ok) {
			console.error(`GitHub API request failed: ${res.status} ${res.statusText}`);
			throw new Error("Failed to fetch release");
		}
		const release = (await res.json()) as GitHubRelease;
		const assets = release.assets || [];

		// Exact match extensions from your Tauri GitHub action outputs
		let winDownload = GITHUB_RELEASES_URL;
		let macDownload = GITHUB_RELEASES_URL;
		let linuxDownload = GITHUB_RELEASES_URL;
		let found = 0;

		for (const asset of assets) {
			if (winDownload === GITHUB_RELEASES_URL && asset.name.endsWith(".exe")) {
				winDownload = asset.browser_download_url;
				found++;
			} else if (macDownload === GITHUB_RELEASES_URL && asset.name.endsWith(".dmg")) {
				macDownload = asset.browser_download_url;
				found++;
			} else if (linuxDownload === GITHUB_RELEASES_URL && asset.name.endsWith(".AppImage")) {
				linuxDownload = asset.browser_download_url;
				found++;
			}
			if (found === 3) break;
		}
		const version = release.tag_name || "v0.0.0";

		return { winDownload, macDownload, linuxDownload, version };
	} catch (error) {
		console.error("Error fetching GitHub release:", error);
		// Safe fallbacks pointing to the root releases page if the API fails
		return {
			winDownload: GITHUB_RELEASES_URL,
			macDownload: GITHUB_RELEASES_URL,
			linuxDownload: GITHUB_RELEASES_URL,
			version: "latest",
		};
	}
};
