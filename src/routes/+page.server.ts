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

		// Helper to find download URL, with a safer fallback
		const findDownloadUrl = (extension: string): string => {
			const asset = assets.find((a) => a.name.endsWith(extension));
			return asset?.browser_download_url || RELEASES_URL;
		};

		// Exact match extensions from your Tauri GitHub action outputs
		const winDownload = findDownloadUrl(".exe");
		const macDownload = findDownloadUrl(".dmg");
		const linuxDownload = findDownloadUrl(".AppImage");
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
