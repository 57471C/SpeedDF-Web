<script lang="ts">
import { claimAndPlay, releaseVideo } from "$lib/exclusiveVideo";
import { isFocusedSurface, setSurfaceRatio } from "$lib/videoFocus.svelte";

type TabId = "view" | "markup" | "grid" | "forms";

interface Tab {
	id: TabId;
	label: string;
	title: string;
	description: string;
	mp4Src: string;
	webmSrc: string;
	videoLabel: string;
}

const tabs: Tab[] = [
	{
		id: "view",
		label: "Viewer",
		title: "Opens before you finish clicking.",
		description:
			"Native Rust renderer, multi-tab workspace, and page thumbnails on the side. Scroll large docs without the usual thrash.",
		mp4Src: "/assets/video/fast-loading.mp4",
		webmSrc: "/assets/video/fast-loading.webm",
		videoLabel: "speedDF main document viewer opening and scrolling a PDF",
	},
	{
		id: "markup",
		label: "Annotate & Sign",
		title: "Marks that actually stick.",
		description:
			"Text, freehand, highlights, shapes, stamps, and signatures. Edits bake into the PDF tree on save, not a fragile overlay.",
		mp4Src: "/assets/video/annotations.mp4",
		webmSrc: "/assets/video/annotations.webm",
		videoLabel: "speedDF annotation tools with freehand, shapes, signatures, and stamps",
	},
	{
		id: "grid",
		label: "Organizer",
		title: "Pages you can rearrange by hand.",
		description:
			"Rotate, reorder, delete, or insert pages in a visual grid. Merge another PDF when the pile gets out of order.",
		mp4Src: "/assets/video/grid-mode.mp4",
		webmSrc: "/assets/video/grid-mode.webm",
		videoLabel: "speedDF grid organizer with selected page and rotate controls",
	},
	{
		id: "forms",
		label: "Forms",
		title: "Fill real form fields, signatures included.",
		description:
			"Type into fillable fields, check boxes, and drop signatures without printing and scanning. Local, instant, and saved into the PDF.",
		mp4Src: "/assets/video/forms.mp4",
		webmSrc: "/assets/video/forms.webm",
		videoLabel: "speedDF filling PDF form fields and adding signatures",
	},
];

let activeTab = $state<TabId>("view");
let sectionEl: HTMLElement | undefined = $state();
let videoEl: HTMLVideoElement | undefined = $state();

const active = $derived(tabs.find((t) => t.id === activeTab) ?? tabs[0]);
const shouldPlay = $derived(isFocusedSurface("preview"));

function selectTab(id: TabId) {
	if (id === activeTab) return;
	if (videoEl) releaseVideo(videoEl);
	activeTab = id;
}

$effect(() => {
	const el = sectionEl;
	if (!el || typeof IntersectionObserver === "undefined") return;

	const observer = new IntersectionObserver(
		([entry]) => {
			const ratio = entry.isIntersecting ? entry.intersectionRatio : 0;
			setSurfaceRatio("preview", ratio);
		},
		{ threshold: [0, 0.25, 0.45, 0.5, 0.6, 0.75, 1] },
	);
	observer.observe(el);
	return () => {
		observer.disconnect();
		setSurfaceRatio("preview", 0);
	};
});

$effect(() => {
	const video = videoEl;
	const play = shouldPlay;
	// Re-run when the active tab's video remounts via {#key}
	void activeTab;

	if (!video) return;

	if (play) {
		// Start from the beginning on tab focus / remount so demos feel intentional.
		claimAndPlay(video, true);
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

<section
	bind:this={sectionEl}
	class="w-full py-16 md:py-24"
	aria-labelledby="preview-heading"
>
	<div class="mb-8 max-w-2xl">
		<h2 id="preview-heading" class="font-display text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
			All of the features, none of the bloat.
		</h2>
		<p class="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">
			Browse through the features that matter.
		</p>
	</div>

	<div class="mb-6 flex flex-wrap gap-2 border-b border-border-dark pb-4" role="tablist" aria-label="App views">
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				role="tab"
				id="tab-{tab.id}"
				aria-selected={activeTab === tab.id}
				aria-controls="panel-{tab.id}"
				class="rounded-lg px-4 py-2 font-display text-sm font-medium transition-colors duration-150
					{activeTab === tab.id
					? 'bg-primary/15 text-primary border border-primary/40'
					: 'border border-transparent text-text-secondary hover:text-slate-50 hover:bg-surface-2'}"
				onclick={() => selectTab(tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<div
		role="tabpanel"
		id="panel-{active.id}"
		aria-labelledby="tab-{active.id}"
		class="grid gap-8 lg:grid-cols-12 lg:items-start"
	>
		<div class="lg:col-span-4 lg:sticky lg:top-24">
			<h3 class="font-display text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
				{active.title}
			</h3>
			<p class="mt-3 max-w-prose text-base leading-relaxed text-text-secondary">
				{active.description}
			</p>
		</div>

		<div class="group relative lg:col-span-8">
			<div class="overflow-hidden rounded-xl border border-border-dark bg-surface-1 shadow-xl shadow-black/30">
				{#key active.id}
					<video
						bind:this={videoEl}
						muted
						loop
						playsinline
						webkit-playsinline
						preload="auto"
						aria-label={active.videoLabel}
						class="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
					>
						<source src={active.mp4Src} type="video/mp4" />
						<source src={active.webmSrc} type="video/webm" />
					</video>
				{/key}
			</div>
		</div>
	</div>
</section>
