<script lang="ts">
import { claimAndPlay, releaseVideo } from "$lib/exclusiveVideo";
import { isFocusedSurface, setSurfaceRatio, surfaceRatio } from "$lib/videoFocus.svelte";
import DownloadButton from "./DownloadButton.svelte";
import LinuxDownloadButton from "./LinuxDownloadButton.svelte";

interface Props {
	winDownload: string;
	macDownload: string;
	linuxAppImage: string;
	linuxDeb: string;
	linuxRpm: string;
	version: string;
}

// biome-ignore lint/correctness/noUnusedVariables: props are used in template markup below
let { winDownload, macDownload, linuxAppImage, linuxDeb, linuxRpm, version }: Props = $props();

let sectionEl: HTMLElement | undefined = $state();
let videoEl: HTMLVideoElement | undefined = $state();

const shouldPlay = $derived(isFocusedSurface("hero"));

$effect(() => {
	const el = sectionEl;
	if (!el || typeof IntersectionObserver === "undefined") return;

	const observer = new IntersectionObserver(
		([entry]) => {
			const ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
			setSurfaceRatio("hero", ratio);
		},
		{ threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.75, 1] },
	);
	observer.observe(el);
	return () => {
		observer.disconnect();
		setSurfaceRatio("hero", 0);
	};
});

// Immediate load/play attempt on mount when visible
$effect(() => {
	const video = videoEl;
	if (!video) return;

	const attemptInitialPlay = () => {
		if (video.paused && (shouldPlay || surfaceRatio.hero > 0)) {
			claimAndPlay(video, false);
		}
	};

	if (video.readyState >= 1) {
		attemptInitialPlay();
	} else {
		video.addEventListener("loadeddata", attemptInitialPlay, { once: true });
		video.addEventListener("canplay", attemptInitialPlay, { once: true });
	}
});

$effect(() => {
	const video = videoEl;
	const play = shouldPlay;
	if (!video) return;

	if (play) {
		claimAndPlay(video, false);
	} else {
		releaseVideo(video);
		if (!video.paused && video.readyState >= 2) {
			try {
				video.currentTime = 0;
			} catch {
				/* not seekable yet */
			}
		}
	}

	return () => {
		releaseVideo(video);
	};
});
</script>

<section bind:this={sectionEl} class="w-full pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20">
	<div class="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
		<div class="flex flex-col items-start text-left lg:col-span-5">
			<h1 class="max-w-xl font-display text-4xl font-bold leading-[1.1] tracking-tight text-slate-50 md:text-5xl lg:text-[3.25rem]">
				Open a PDF. Mark it up. Save. Done.
			</h1>
			<p class="mt-5 max-w-md text-base leading-relaxed text-text-secondary md:text-lg">
				Local desktop PDF editor. No cloud, no accounts, no waiting for a splash screen.
			</p>

			<div class="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
				<DownloadButton href={winDownload} osName="Windows" {version}>
					<svg class="h-[18px] w-[18px] text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<title>Windows</title>
						<path d="M0 3.449L9.75 2.1v9.451H0V3.449zM10.949 1.95L24 0v11.4H10.949V1.95zM0 12.6h9.75v9.451L0 20.699V12.6zm10.949 0H24V24l-13.051-1.801V12.6z"/>
					</svg>
				</DownloadButton>

				<DownloadButton href={macDownload} osName="macOS" {version}>
					<svg class="h-[22px] w-[22px] text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<title>macOS</title>
						<path d="M17.05 20.28c-.96 0-2.04-.6-3.22-.6-1.17 0-2.28.59-3.22.59-1.52 0-4.17-2.53-4.17-6.03 0-3.44 2.22-5.27 4.3-5.27 1.13 0 2.1.75 2.81.75.7 0 1.83-.83 3.1-.83 1.31 0 2.35.48 3.05 1.5-2.62 1.54-2.2 5.17.45 6.24-.6 1.5-1.38 2.98-2.1 3.65zM12.03 7.25c0-2.42 2.01-4.38 4.46-4.38.06 0 .12 0 .18.01-.1 2.45-2.14 4.34-4.59 4.34-.02 0-.04 0-.05-.01z"/>
					</svg>
				</DownloadButton>

				<LinuxDownloadButton
					appImageUrl={linuxAppImage}
					debUrl={linuxDeb}
					rpmUrl={linuxRpm}
					{version}
				>
					<svg class="h-[20px] w-[20px] text-primary" fill="currentColor" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
						<title>Linux</title>
						<path d="M113.823 104.595c-1.795-1.478-3.629-2.921-5.308-4.525-1.87-1.785-3.045-3.944-2.789-6.678.147-1.573-.216-2.926-2.113-3.452.446-1.154.864-1.928 1.033-2.753.188-.92.178-1.887.204-2.834.264-9.96-3.334-18.691-8.663-26.835-2.454-3.748-5.017-7.429-7.633-11.066-4.092-5.688-5.559-12.078-5.633-18.981a47.564 47.564 0 00-1.081-9.475C80.527 11.956 77.291 7.233 71.422 4.7c-4.497-1.942-9.152-2.327-13.901-1.084-6.901 1.805-11.074 6.934-10.996 14.088.074 6.885.417 13.779.922 20.648.288 3.893-.312 7.252-2.895 10.34-2.484 2.969-4.706 6.172-6.858 9.397-1.229 1.844-2.317 3.853-3.077 5.931-2.07 5.663-3.973 11.373-7.276 16.5-1.224 1.9-1.363 4.026-.494 6.199.225.563.363 1.429.089 1.882-2.354 3.907-5.011 7.345-10.066 8.095-3.976.591-4.172 1.314-4.051 5.413.1 3.337.061 6.705-.28 10.021-.363 3.555.008 4.521 3.442 5.373 7.924 1.968 15.913 3.647 23.492 6.854 3.227 1.365 6.465.891 9.064-1.763 2.713-2.771 6.141-3.855 9.844-3.859 6.285-.005 12.572.298 18.86.369 1.702.02 2.679.653 3.364 2.199.84 1.893 2.26 3.284 4.445 3.526 4.193.462 8.013-.16 11.19-3.359 3.918-3.948 8.436-7.066 13.615-9.227 1.482-.619 2.878-1.592 4.103-2.648 2.231-1.922 2.113-3.146-.135-5z"/>
					</svg>
				</LinuxDownloadButton>
			</div>

			<a
				href="https://github.com/57471C/speedDF"
				target="_blank"
				rel="noreferrer"
				class="mt-5 inline-flex items-center gap-2 font-mono text-xs text-text-secondary transition-colors duration-150 hover:text-primary"
			>
				<span class="underline decoration-surface-3 underline-offset-4">View source on GitHub</span>
				<span class="text-primary/80">{version}</span>
			</a>
		</div>

		<div class="lg:col-span-7">
			<div class="group relative overflow-hidden rounded-xl border border-border-dark bg-surface-1 shadow-2xl shadow-black/40">
				<div class="relative overflow-hidden bg-background">
					<video
						bind:this={videoEl}
						muted
						loop
						playsinline
						webkit-playsinline
						preload="auto"
						aria-label="speedDF light-mode document view"
						class="block h-auto w-full origin-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
					>
						<source src="/assets/video/light-mode.mp4" type="video/mp4" />
						<source src="/assets/video/light-mode.webm" type="video/webm" />
					</video>
				</div>
			</div>
		</div>
	</div>
</section>
