/**
 * Shared viewport focus for demo videos.
 * Only the more-visible surface above the threshold may play.
 */

export type VideoSurface = "hero" | "preview";

const THRESHOLD = 0.45;

/** Latest intersection ratios (0–1) reported by each surface. */
export const surfaceRatio = $state({
	hero: 0,
	preview: 0,
});

/** Tracks whether the user has manually clicked/tapped a tab in AppPreview. */
export let userInteractedWithPreview = $state(false);

export function setUserInteractedWithPreview(val = true): void {
	userInteractedWithPreview = val;
}

export function setSurfaceRatio(surface: VideoSurface, ratio: number): void {
	surfaceRatio[surface] = ratio;
}

/** True when this surface is the single winner. */
export function isFocusedSurface(surface: VideoSurface): boolean {
	const heroRatio = surfaceRatio.hero;
	const previewRatio = surfaceRatio.preview;

	if (surface === "hero") {
		// Hero is inactive if completely scrolled out of view
		if (heroRatio === 0) return false;
		// If user manually tapped a tab and preview is more visible, preview takes precedence
		if (userInteractedWithPreview && previewRatio > heroRatio) return false;
		// Otherwise Hero owns focus while visible
		return true;
	}

	// Preview surface requires at least 20% visibility
	if (previewRatio < 0.2) return false;
	// AppPreview will NOT auto-play on initial load if Hero is in view unless user clicked a tab
	if (heroRatio > 0 && !userInteractedWithPreview) return false;
	// Otherwise preview plays if its ratio is >= hero's ratio
	return previewRatio >= heroRatio;
}
