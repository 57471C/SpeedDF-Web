import type { GitHubRelease } from "$lib/types";
import type { PageServerLoad } from "./$types";

const RELEASES_URL = "https://github.com/57471C/speedDF/releases";

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Cache the page response at Cloudflare's edge for 15 minutes
	setHeaders({
		"cache-control": "public, max-age=900, s-maxage=900",
	});

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
			let linuxDownload = "";

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
				// Linux: .appimage or .deb
				else if (
					!linuxDownload &&
					(name.endsWith(".appimage") || name.endsWith(".deb") || name.endsWith(".rpm"))
				) {
					linuxDownload = asset.browser_download_url;
				}
			}

			return {
				winDownload: winDownload || `${RELEASES_URL}/latest`,
				macDownload: macDownload || `${RELEASES_URL}/latest`,
				linuxDownload: linuxDownload || `${RELEASES_URL}/latest`,
				version,
			};
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
				`${RELEASES_URL}/latest`;

			const linuxDownload =
				platforms["linux-x86_64-appimage"]?.url ||
				platforms["linux-x86_64"]?.url ||
				`${RELEASES_URL}/latest`;

			return { winDownload, macDownload, linuxDownload, version };
		}
	} catch (e) {
		console.error("Internal /latest.json fallback failed:", e);
	}

	// 3. Emergency Fallback
	return {
		winDownload: `${RELEASES_URL}/latest`,
		macDownload: `${RELEASES_URL}/latest`,
		linuxDownload: `${RELEASES_URL}/latest`,
		version: "v1.0.2",
	};
};