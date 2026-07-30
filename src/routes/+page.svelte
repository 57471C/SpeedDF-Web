<script lang="ts">
import AppPreview from "$lib/components/AppPreview.svelte";
import Footer from "$lib/components/Footer.svelte";
import Header from "$lib/components/Header.svelte";
import Hero from "$lib/components/Hero.svelte";
import PrivacyModal from "$lib/components/PrivacyModal.svelte";
import SpecsStrip from "$lib/components/SpecsStrip.svelte";
import WhySection from "$lib/components/WhySection.svelte";
import type { PageData } from "./$types";

let showPrivacyModal = $state(false);

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

<main class="relative z-10 flex w-full flex-grow flex-col">
	<div class="mx-auto w-full max-w-6xl px-6">
		<Hero
			winDownload={data.winDownload}
			macDownload={data.macDownload}
			linuxAppImage={data.linuxAppImage}
			linuxDeb={data.linuxDeb}
			linuxRpm={data.linuxRpm}
			version={data.version}
		/>

		<AppPreview />

		<WhySection />

		<SpecsStrip />
	</div>
</main>

<Footer onOpenPrivacyModal={() => { showPrivacyModal = true; }} />

{#if showPrivacyModal}
	<PrivacyModal {closeModal} />
{/if}
