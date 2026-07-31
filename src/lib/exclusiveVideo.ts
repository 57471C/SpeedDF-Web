/**
 * Ensures at most one demo video is playing site-wide.
 * Callers still own when to request play/pause (tabs, IntersectionObserver).
 */

let current: HTMLVideoElement | null = null;

/** Pause and clear the active slot if it matches `el` (or always if no el). */
export function releaseVideo(el?: HTMLVideoElement | null): void {
	if (el) {
		el.pause();
		if (current === el) current = null;
		return;
	}
	if (current) {
		current.pause();
		current = null;
	}
}

/**
 * Pause any other demo video, then play `el`.
 * @param resetToStart - rewind before play (tab switches / intentional demos)
 */
export function claimAndPlay(el: HTMLVideoElement, resetToStart = false): void {
	if (current && current !== el) {
		current.pause();
	}
	current = el;
	if (resetToStart) {
		try {
			el.currentTime = 0;
		} catch {
			/* ignore if not seekable yet */
		}
	}
	void el.play().catch(() => {
		/* autoplay can be blocked; muted + playsinline is usually enough */
	});
}
