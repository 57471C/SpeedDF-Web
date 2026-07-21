import { json } from "@sveltejs/kit";
import type { GitHubRelease } from "$lib/types";
import type { RequestHandler } from "./$types";

// Cache the downloaded JSON payload for 5 minutes to avoid hitting the GitHub API rate limit
// and making two sequential HTTP requests per function invocation.
// biome-ignore lint/suspicious/noExplicitAny: Data is passed from GitHub directly as unknown JSON payload
let cachedAssetData: { data: any; expiresAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getAllowedOrigin(origin: string | null): string | null {
	if (!origin) return null;
	// Allow standard Tauri and local development origins
	if (
		origin === "tauri://localhost" ||
		origin === "https://tauri.localhost" ||
		origin === "http://tauri.localhost" ||
		origin === "app://localhost" ||
		origin.startsWith("http://localhost:") ||
		origin.startsWith("https://localhost:")
	) {
		return origin;
	}
	return null;
}

export const OPTIONS: RequestHandler = async ({ request }) => {
	const origin = request.headers.get("origin");
	const allowedOrigin = getAllowedOrigin(origin);

	const headers: Record<string, string> = {
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, User-Agent",
	};

	if (allowedOrigin) {
		headers["Access-Control-Allow-Origin"] = allowedOrigin;
	}

	return new Response(null, { headers });
};

export const GET: RequestHandler = async ({ fetch, setHeaders, request }) => {
	const origin = request.headers.get("origin");
	const allowedOrigin = getAllowedOrigin(origin);

	if (allowedOrigin) {
		setHeaders({
			"Access-Control-Allow-Origin": allowedOrigin,
		});
	}

	try {
		if (cachedAssetData && Date.now() < cachedAssetData.expiresAt) {
			setHeaders({
				"cache-control": "public, max-age=300",
			});
			return json(cachedAssetData.data, {
				headers: {
					"content-type": "application/json",
				},
			});
		}

		// 1. Query the GitHub API for your app's absolute latest release
		const response = await fetch("https://api.github.com/repos/57471C/speedDF/releases/latest", {
			headers: { "User-Agent": "speeddf-web-updater" },
		});

		if (!response.ok) {
			return json({ error: "Failed to fetch release from GitHub" }, { status: 500 });
		}

		const release = (await response.json()) as GitHubRelease;

		// 2. Find the latest.json asset that Tauri uploaded to the release
		const latestJsonAsset = release.assets?.find((asset) => asset.name === "latest.json");

		if (!latestJsonAsset) {
			return json(
				{ error: "latest.json file not found in the latest GitHub release assets" },
				{ status: 404 },
			);
		}

		const downloadUrl = latestJsonAsset.browser_download_url;

		// 3. Grab the live content of that file straight from GitHub's CDN
		const assetResponse = await fetch(downloadUrl);
		if (!assetResponse.ok) {
			return json({ error: "Failed to download asset data payload" }, { status: 500 });
		}

		const updaterData = await assetResponse.json();

		cachedAssetData = {
			data: updaterData,
			expiresAt: Date.now() + CACHE_TTL_MS,
		};

		// 4. Feed it back to the Tauri app with CORS clearance and a short cache window
		setHeaders({
			"cache-control": "public, max-age=300", // Cache at edge for 5 minutes to keep it snappy
		});
		return json(updaterData, {
			headers: {
				"content-type": "application/json",
			},
		});
	} catch (err: unknown) {
		console.error("Error handling release fetch:", err);
		return json({ error: "Internal Server Error" }, { status: 500 });
	}
};
