<script lang="ts">
import FeatureShowcase from "$lib/components/FeatureShowcase.svelte";
import Footer from "$lib/components/Footer.svelte";
import Header from "$lib/components/Header.svelte";
import Hero from "$lib/components/Hero.svelte";
import PerformanceSection from "$lib/components/PerformanceSection.svelte";
import PrivacyModal from "$lib/components/PrivacyModal.svelte";
import type { PageData } from "./$types";

let showPrivacyModal = $state(false);

// Active Tab state for the interactive preview (Svelte 5 rune)
let activeTab = $state<"view" | "markup" | "grid">("view");

function closeModal() {
	showPrivacyModal = false;
}

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Escape" && showPrivacyModal) {
		closeModal();
	}
}

let { data }: { data: PageData } = $props();
</script>

<svelte:window onkeydown={handleKeydown} />

<Header />

<main class="relative z-10 flex flex-grow flex-col items-center justify-center px-6 pb-10 pt-24">
	<div class="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_0%,transparent_70%)]"></div>
	
	<div class="relative z-10 flex w-full max-w-5xl flex-col items-center text-center">
		<Hero
			winDownload={data.winDownload}
			macDownload={data.macDownload}
			linuxDownload={data.linuxDownload}
			version={data.version}
		/>

		<section class="mt-12 w-full rounded-2xl border border-white/10 bg-zinc-950/60 p-4 backdrop-blur-xl md:p-8">
			
			<div class="mb-8 flex justify-center gap-2 border-b border-white/10 pb-4">
				<button 
					class="rounded-lg px-4 py-2 font-mono text-sm transition-colors {activeTab === 'view' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-zinc-400 hover:text-white'}"
					onclick={() => activeTab = 'view'}
				>
					01 / Viewer
				</button>

				<button 
					class="rounded-lg px-4 py-2 font-mono text-sm transition-colors {activeTab === 'markup' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-zinc-400 hover:text-white'}"
					onclick={() => activeTab = 'markup'}
				>
					02 / Annotate & Sign
				</button>

				<button 
					class="rounded-lg px-4 py-2 font-mono text-sm transition-colors {activeTab === 'grid' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-zinc-400 hover:text-white'}"
					onclick={() => activeTab = 'grid'}
				>
					03 / Grid View / Page Organizer
				</button>
			</div>

			{#if activeTab === 'view'}
				<FeatureShowcase
					badge="INSTANT COLD START"
					title="Opens before you finish clicking."
					description="No splash screens, no cloud handshakes. Just a native Rust renderer built for fast scrolling through large documents."
					imageSrc="/assets/screenshots/mainView.png"
					imageAlt="speedDF Main Document View"
					mbClass="mb-4"
				/>
			{:else if activeTab === 'markup'}
				<FeatureShowcase
					badge="VECTOR COMPILATION"
					title="Edits baked straight into the PDF tree."
					description="Highlights, vector freehand, text edits, and signatures are mathematically embedded directly into the document using custom font metrics."
					imageSrc="/assets/screenshots/markup.png"
					imageAlt="speedDF Annotation and Markups"
					mbClass="mb-4"
				/>
			{:else if activeTab === 'grid'}
				<FeatureShowcase
					badge="PAGE MANAGEMENT"
					title="Visual Multi-Page Grid Editor."
					description="Reorder pages via drag and drop, rotate orientations, or strip out unwanted pages visually in seconds."
					imageSrc="/assets/screenshots/gridView.png"
					imageAlt="speedDF Grid View and Page Manager"
					mbClass="mb-4"
				/>
			{/if}
		</section>
	</div>
</main>

<PerformanceSection />

<Footer onOpenPrivacyModal={() => { showPrivacyModal = true; }} />

{#if showPrivacyModal}
	<PrivacyModal {closeModal} />
{/if}