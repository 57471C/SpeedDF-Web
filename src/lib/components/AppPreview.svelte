<script lang="ts">
type TabId = "view" | "markup" | "grid";

interface Tab {
	id: TabId;
	label: string;
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
}

const tabs: Tab[] = [
	{
		id: "view",
		label: "Viewer",
		title: "Opens before you finish clicking.",
		description:
			"Native Rust renderer, multi-tab workspace, and page thumbnails on the side. Scroll large docs without the usual thrash.",
		imageSrc: "/assets/screenshots/mainView.png",
		imageAlt: "speedDF main document viewer with sidebar page thumbnails",
	},
	{
		id: "markup",
		label: "Annotate & Sign",
		title: "Marks that actually stick.",
		description:
			"Text, freehand, highlights, shapes, stamps, and signatures. Edits bake into the PDF tree on save, not a fragile overlay.",
		imageSrc: "/assets/screenshots/markup.png",
		imageAlt: "speedDF annotation tools with freehand, shapes, signatures, and stamps",
	},
	{
		id: "grid",
		label: "Organizer",
		title: "Pages you can rearrange by hand.",
		description:
			"Rotate, reorder, delete, or insert pages in a visual grid. Merge another PDF when the pile gets out of order.",
		imageSrc: "/assets/screenshots/gridView.png",
		imageAlt: "speedDF grid organizer with selected page and rotate controls",
	},
];

let activeTab = $state<TabId>("view");

const active = $derived(tabs.find((t) => t.id === activeTab) ?? tabs[0]);
</script>

<section class="w-full py-16 md:py-24" aria-labelledby="preview-heading">
	<div class="mb-8 max-w-2xl">
		<h2 id="preview-heading" class="font-display text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
			The app, not the pitch deck.
		</h2>
		<p class="mt-3 text-base leading-relaxed text-text-secondary md:text-lg">
			Same dark UI you get after install. Click through the views that matter.
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
				onclick={() => (activeTab = tab.id)}
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
				<img
					src={active.imageSrc}
					alt={active.imageAlt}
					width="1600"
					height="1000"
					class="block h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.015]"
				/>
			</div>
		</div>
	</div>
</section>
