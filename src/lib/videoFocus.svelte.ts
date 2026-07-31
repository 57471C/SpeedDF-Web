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
	if (self < THRESHOLD) return false;
	// Strict greater-than loses ties to the other surface when ratios are equal —
	// prefer preview on a tie so the interactive demo wins when both peek into view.
	if (surface === "preview") return self >= other;
	return self > other;
}
