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

export function setSurfaceRatio(surface: VideoSurface, ratio: number): void {
	surfaceRatio[surface] = ratio;
}

/** True when this surface is the single winner (visible enough and more so than the other). */
export function isFocusedSurface(surface: VideoSurface): boolean {
	const self = surfaceRatio[surface];
	const other = surface === "hero" ? surfaceRatio.preview : surfaceRatio.hero;
	if (surface === "hero") {
		// Hero stays focused as long as it has any visibility (> 0),
		// unless preview is clearly visible and taking priority (other >= 0.4).
		if (self === 0) return false;
		if (other >= 0.4 && other > self) return false;
		return true;
	}
	// Preview surface requires at least 30% visibility
	if (self < 0.3) return false;
	return self >= other;
}
