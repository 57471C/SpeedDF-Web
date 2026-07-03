<script lang="ts">
// biome-ignore lint/correctness/noUnusedImports: rendered in template markup below
import FeatureShowcase from "$lib/components/FeatureShowcase.svelte";
// biome-ignore lint/correctness/noUnusedImports: rendered in template markup below
import Footer from "$lib/components/Footer.svelte";
// biome-ignore lint/correctness/noUnusedImports: rendered in template markup below
import Header from "$lib/components/Header.svelte";
// biome-ignore lint/correctness/noUnusedImports: rendered in template markup below
import Hero from "$lib/components/Hero.svelte";
// biome-ignore lint/correctness/noUnusedImports: rendered in template markup below
import PerformanceSection from "$lib/components/PerformanceSection.svelte";
// biome-ignore lint/correctness/noUnusedImports: rendered in template markup below
import PrivacyModal from "$lib/components/PrivacyModal.svelte";
import type { PageData } from "./$types";

// Svelte 5 state controlling the modal presentation layer
let showPrivacyModal = $state(false);

function closeModal() {
	showPrivacyModal = false;
}

// biome-ignore lint/correctness/noUnusedVariables: handleKeydown is used in svelte:window template markup
function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Escape" && showPrivacyModal) {
		closeModal();
	}
}

// biome-ignore lint/correctness/noUnusedVariables: data is used in template markup below
let { data }: { data: PageData } = $props(); // Svelte 5 runes syntax
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
		
		<FeatureShowcase
			badge="01 / DOCUMENT VIEW"
			title="Blazing-Fast Viewing"
			description="Open, scroll, and browse heavy PDF files instantly. A lightweight native engine designed with focus on readability and smooth performance."
			imageSrc="/assets/screenshots/mainView.png"
			imageAlt="speedDF Main Document View"
			mbClass="mb-24"
		/>

		<FeatureShowcase
			badge="02 / ANNOTATION & MARKUP"
			title="Rich Markup & Signatures"
			description="Highlight key text, sketch freehand, place geometric shapes, and add quick text markups. Securely sign or initial contracts locally in seconds."
			imageSrc="/assets/screenshots/markup.png"
			imageAlt="speedDF Annotation and Markups"
			mbClass="mb-24"
		/>

		<FeatureShowcase
			badge="03 / DOCUMENT MANAGEMENT"
			title="Multi-Page Grid Editor"
			description="Take control of your document structure. Effortlessly drag to reorganize, rotate, delete, or merge multiple pages in a visual dashboard layout."
			imageSrc="/assets/screenshots/gridView.png"
			imageAlt="speedDF Grid View and Page Manager"
			mbClass="mb-20"
		/>
	</div>
</main>

<PerformanceSection />

<Footer onOpenPrivacyModal={() => { showPrivacyModal = true; }} />

{#if showPrivacyModal}
	<PrivacyModal {closeModal} />
{/if}