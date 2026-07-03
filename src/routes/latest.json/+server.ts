import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

interface GitHubAsset {
	name: string;
	browser_download_url: string;
}

interface GitHubRelease {
	tag_name: string;
	assets: GitHubAsset[];
}

export const OPTIONS: RequestHandler = async () => {
	return new Response(null, {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, User-Agent",
		},
	});
};

export const GET: RequestHandler = async ({ fetch, setHeaders }) => {
	// Apply CORS clearance for all responses (including errors)
	setHeaders({
		"Access-Control-Allow-Origin": "*",
	});

	try {
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

		// 3. Grab the live content of that file straight from GitHub's CDN
		const assetResponse = await fetch(latestJsonAsset.browser_download_url);
		if (!assetResponse.ok) {
			return json({ error: "Failed to download asset data payload" }, { status: 500 });
		}

		const updaterData = await assetResponse.json();

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
		const message = err instanceof Error ? err.message : "Unknown error occurred";
		return json({ error: message }, { status: 500 });
	}
};
