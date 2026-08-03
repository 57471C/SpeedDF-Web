<script lang="ts">
import BrandMark from "./BrandMark.svelte";
import LeanStudioCredit from "./LeanStudioCredit.svelte";

interface Props {
	onOpenPrivacyModal: () => void;
}

// biome-ignore lint/correctness/noUnusedVariables: onOpenPrivacyModal is used in template markup below
let { onOpenPrivacyModal }: Props = $props();

// biome-ignore lint/correctness/noUnusedVariables: currentYear is used in template markup below
const currentYear = new Date().getFullYear();
</script>

<footer class="relative z-10 w-full border-t border-border-dark bg-background py-10">
	<div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between">
		<div class="max-w-sm">
			<BrandMark href="/" size="sm" />
			<p class="mt-2 text-sm leading-relaxed text-text-secondary">
				Open source PDF editor. Built local, ships small, stays on your machine.
			</p>
		</div>

		<nav class="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-text-secondary" aria-label="Footer">
			<a class="transition-colors duration-150 hover:text-primary" href="https://github.com/57471C/speedDF/wiki">Docs</a>
			<button type="button" onclick={onOpenPrivacyModal} class="cursor-pointer transition-colors duration-150 hover:text-primary">Privacy</button>
			<a class="transition-colors duration-150 hover:text-primary" href="https://github.com/57471C/speedDF">GitHub</a>
			<a class="transition-colors duration-150 hover:text-primary" href="https://github.com/57471C/speedDF/releases">Releases</a>
			<a class="transition-colors duration-150 hover:text-primary" href="https://buymeacoffee.com/lean.studio" target="_blank" rel="noreferrer">Buy me a coffee</a>
		</nav>

		<div class="flex flex-col items-start gap-2 md:items-end">
			<p class="font-mono text-xs text-text-secondary/80">
				© {currentYear} speedDF
			</p>
			<LeanStudioCredit showIcon={false} />
		</div>
	</div>
</footer>
