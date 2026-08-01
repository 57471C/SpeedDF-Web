/**
 * Ensures at most one demo video is playing site-wide.
 * Callers still own when to request play/pause (tabs, IntersectionObserver).
 */

let current: HTMLVideoElement | null = null;

/** Safely pause a video only if it has started playing / has decoded frames. */
export function safePause(video: HTMLVideoElement): void {
	if (!video.paused && video.readyState >= 2) {
		try {
			video.pause();
		} catch {
			/* ignore pause errors */
		}
	}
}

/** Pause and clear the active slot if it matches `el` (or always if no el). */
export function releaseVideo(el?: HTMLVideoElement | null): void {
	if (el) {
		safePause(el);
		if (current === el) current = null;
		return;
	}
	if (current) {
		safePause(current);
		current = null;
	}
}

/**
 * Pause any other demo video, then play `el`.
 * @param resetToStart - rewind before play (tab switches / intentional demos)
 */
export function claimAndPlay(el: HTMLVideoElement, resetToStart = false): void {
	if (current && current !== el) {
		safePause(current);
	}
	current = el;

	if (resetToStart) {
		if (!el.paused && el.readyState >= 2) {
			try {
				el.currentTime = 0;
			} catch {
				/* ignore if not seekable yet */
			}
		}
	}

	if (el.readyState >= 2) {
		el.play().catch(() => {
			/* autoplay can be blocked; muted + playsinline is usually enough */
		});
	} else {
		el.addEventListener(
			"loadeddata",
			() => {
				if (current === el) {
					el.play().catch(() => {
						/* autoplay can be blocked */
					});
				}
			},
			{ once: true },
		);
	}
}
