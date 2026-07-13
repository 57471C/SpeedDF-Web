import type { PageServerLoad } from "./$types";

// Define interfaces for the GitHub API response to avoid using `any`
interface GitHubAsset {
	name: string;
	browser_download_url: string;
}

interface GitHubRelease {
	tag_name: string;
	assets: GitHubAsset[];
}

const RELEASES_URL = "https://github.com/57471C/speedDF/releases";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Cache the page at the Cloudflare edge for 1 hour to protect your GitHub API limits
	setHeaders({
		"cache-control": "public, max-age=3600, s-maxage=3600",
	});
	try {
		const res = await fetch("https://api.github.com/repos/57471C/speedDF/releases/latest", {
			headers: { "User-Agent": "speeddf-web-landing-page" },
		});

		if (!res.ok) {
			console.error(`GitHub API request failed: ${res.status} ${res.statusText}`);
			throw new Error("Failed to fetch release");
		}
		const release = (await res.json()) as GitHubRelease;
		const assets = release.assets || [];

		// Exact match extensions from your Tauri GitHub action outputs
		let winDownload = RELEASES_URL;
		let macDownload = RELEASES_URL;
		let linuxDownload = RELEASES_URL;
		let found = 0;

		for (const asset of assets) {
			if (winDownload === RELEASES_URL && asset.name.endsWith(".exe")) {
				winDownload = asset.browser_download_url;
				found++;
			} else if (macDownload === RELEASES_URL && asset.name.endsWith(".dmg")) {
				macDownload = asset.browser_download_url;
				found++;
			} else if (linuxDownload === RELEASES_URL && asset.name.endsWith(".AppImage")) {
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
			winDownload: RELEASES_URL,
			macDownload: RELEASES_URL,
			linuxDownload: RELEASES_URL,
			version: "latest",
		};
	}
};
