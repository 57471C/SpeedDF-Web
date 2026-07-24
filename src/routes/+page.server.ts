import type { GitHubRelease } from "$lib/types";
import type { PageServerLoad } from "./$types";

const RELEASES_URL = "https://github.com/57471C/speedDF/releases";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Cache the page at the Cloudflare edge for 1 hour to protect your GitHub API limits
	setHeaders({
		"cache-control": "public, max-age=3600, s-maxage=3600",
	});

	try {
		const res = await fetch("https://api.github.com/repos/57471C/speedDF/releases/latest", {
			headers: { 
				"User-Agent": "speeddf-web-landing-page",
				"Accept": "application/vnd.github.v3+json"
			},
		});

		if (!res.ok) {
			console.error(`GitHub API request failed: ${res.status} ${res.statusText}`);
			throw new Error("Failed to fetch release");
		}

		const release = (await res.json()) as GitHubRelease;
		const assets = release.assets || [];

		let winDownload = RELEASES_URL;
		let macDownload = RELEASES_URL;
		let linuxDownload = RELEASES_URL;

		for (const asset of assets) {
			const name = asset.name.toLowerCase();

			// 1. Windows: .exe setup installer
			if (winDownload === RELEASES_URL && name.endsWith(".exe")) {
				winDownload = asset.browser_download_url;
			} 
			// 2. macOS: .app.tar.gz, .tar.gz, or .dmg
			else if (
				macDownload === RELEASES_URL && 
				(name.endsWith(".dmg") || name.endsWith(".app.tar.gz") || name.endsWith(".tar.gz"))
			) {
				macDownload = asset.browser_download_url;
			} 
			// 3. Linux: .appimage or .deb
			else if (
				linuxDownload === RELEASES_URL && 
				(name.endsWith(".appimage") || name.endsWith(".deb"))
			) {
				linuxDownload = asset.browser_download_url;
			}
		}

		const version = release.tag_name || "v0.0.0";

		return { winDownload, macDownload, linuxDownload, version };
	} catch (error) {
		console.error("Error fetching GitHub release:", error);
		return {
			winDownload: RELEASES_URL,
			macDownload: RELEASES_URL,
			linuxDownload: RELEASES_URL,
			version: "latest",
		};
	}
};