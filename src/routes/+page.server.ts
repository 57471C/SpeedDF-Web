import type { GitHubRelease } from "$lib/types";
import type { PageServerLoad } from "./$types";

const RELEASES_URL = "https://github.com/57471C/speedDF/releases";
const RELEASES_LATEST = `${RELEASES_URL}/latest`;

interface PageData {
	winDownload: string;
	macDownload: string;
	linuxAppImage: string;
	linuxDeb: string;
	linuxRpm: string;
	version: string;
}

let cachedPageData: { data: PageData; expiresAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000;

function emptyLinux(): Pick<PageData, "linuxAppImage" | "linuxDeb" | "linuxRpm"> {
	return {
		linuxAppImage: RELEASES_LATEST,
		linuxDeb: "",
		linuxRpm: "",
	};
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Cache the page response at Cloudflare's edge for 15 minutes
	setHeaders({
		"cache-control": "public, max-age=900, s-maxage=900",
	});

	if (cachedPageData && Date.now() < cachedPageData.expiresAt) {
		return cachedPageData.data;
	}

	try {
		// 1. Primary Attempt: Call GitHub API for direct release assets
		const res = await fetch("https://api.github.com/repos/57471C/speedDF/releases/latest", {
			headers: {
				"User-Agent": "speeddf-web-landing-page",
				Accept: "application/vnd.github.v3+json",
			},
		});

		if (res.ok) {
			const release = (await res.json()) as GitHubRelease;
			const assets = release.assets || [];
			const rawVersion = release.tag_name || "v1.0.2";
			const version = rawVersion.startsWith("v") ? rawVersion : `v${rawVersion}`;

			let winDownload = "";
			let macDownload = "";
			let linuxAppImage = "";
			let linuxDeb = "";
			let linuxRpm = "";

			for (const asset of assets) {
				const name = asset.name.toLowerCase();

				// Windows: .exe installer or .msi
				if (!winDownload && (name.endsWith(".exe") || name.endsWith(".msi"))) {
					winDownload = asset.browser_download_url;
				}
				// macOS: .dmg, .pkg, or .app.tar.gz / .tar.gz
				else if (
					!macDownload &&
					(name.endsWith(".dmg") ||
						name.endsWith(".pkg") ||
						name.endsWith(".app.tar.gz") ||
						name.endsWith(".tar.gz"))
				) {
					macDownload = asset.browser_download_url;
				}
				// Linux: collect each format independently
				else if (!linuxAppImage && name.endsWith(".appimage")) {
					linuxAppImage = asset.browser_download_url;
				} else if (!linuxDeb && name.endsWith(".deb")) {
					linuxDeb = asset.browser_download_url;
				} else if (!linuxRpm && name.endsWith(".rpm")) {
					linuxRpm = asset.browser_download_url;
				}
			}

			const data: PageData = {
				winDownload: winDownload || RELEASES_LATEST,
				macDownload: macDownload || RELEASES_LATEST,
				linuxAppImage: linuxAppImage || RELEASES_LATEST,
				linuxDeb,
				linuxRpm,
				version,
			};
			cachedPageData = { data, expiresAt: Date.now() + CACHE_TTL_MS };
			return data;
		}
	} catch (e) {
		console.error("Direct GitHub API call failed, falling back to internal manifest:", e);
	}

	try {
		// 2. Secondary Attempt: Fallback to reading our internal /latest.json route
		const localRes = await fetch("/latest.json");
		if (localRes.ok) {
			const manifest = await localRes.json();
			const rawVer = manifest.version || "1.0.2";
			const version = rawVer.startsWith("v") ? rawVer : `v${rawVer}`;
			const platforms = manifest.platforms || {};

			const winDownload =
				platforms["windows-x86_64-nsis"]?.url ||
				platforms["windows-x86_64"]?.url ||
				`${RELEASES_URL}/download/${version}/speeddf_${rawVer}_x64-setup.exe`;

			const macDownload =
				platforms["darwin-aarch64"]?.url ||
				platforms["darwin-aarch64-app"]?.url ||
				platforms["darwin-x86_64"]?.url ||
				RELEASES_LATEST;

			const linuxAppImage =
				platforms["linux-x86_64-appimage"]?.url ||
				platforms["linux-x86_64"]?.url ||
				RELEASES_LATEST;

			const linuxDeb =
				platforms["linux-x86_64-deb"]?.url || platforms["linux-amd64-deb"]?.url || "";

			const linuxRpm =
				platforms["linux-x86_64-rpm"]?.url || platforms["linux-amd64-rpm"]?.url || "";

			const data: PageData = {
				winDownload,
				macDownload,
				linuxAppImage,
				linuxDeb,
				linuxRpm,
				version,
			};
			cachedPageData = { data, expiresAt: Date.now() + CACHE_TTL_MS };
			return data;
		}
	} catch (e) {
		console.error("Internal /latest.json fallback failed:", e);
	}

	// 3. Emergency Fallback
	const fallbackData: PageData = {
		winDownload: RELEASES_LATEST,
		macDownload: RELEASES_LATEST,
		...emptyLinux(),
		version: "v1.0.2",
	};
	cachedPageData = { data: fallbackData, expiresAt: Date.now() + CACHE_TTL_MS };
	return fallbackData;
};
