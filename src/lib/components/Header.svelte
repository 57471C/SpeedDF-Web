<script lang="ts">
import BrandMark from "./BrandMark.svelte";
</script>

<header class="sticky top-0 z-50 w-full border-b border-border-dark/80 bg-background/85 backdrop-blur-md">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
		<BrandMark href="/" size="md" />

		<div class="flex items-center gap-3">
			<a
				href="https://buymeacoffee.com/speeddf"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-yellow-500 transition-all duration-150 hover:border-yellow-500/60 hover:bg-yellow-500/20 active:scale-[0.98]"
			>
				<svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M2 21h18v-2H2v2zm6-4h6c2.21 0 4-1.79 4-4v-1h1c1.66 0 3-1.34 3-3s-1.34-3-3-3h-1.1C16.4 3.84 14.42 2 12 2H6c-1.1 0-2 .9-2 2v11c0 2.21 1.79 4 4 4zM6 4h6c1.1 0 2 .9 2 2v1H6V4zm0 5h8v4c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V9zm12 0h1c.55 0 1 .45 1 1s-.45 1-1 1h-1V9z"/>
				</svg>
				<span class="hidden sm:inline">Buy me a coffee</span>
			</a>
			<a
				href="https://github.com/57471C/speedDF"
				target="_blank"
				rel="noreferrer"
				class="inline-flex items-center gap-2 rounded-full border border-border-dark bg-surface-2 px-4 py-2 font-mono text-xs uppercase tracking-wider text-slate-200 transition-all duration-150 hover:bg-surface-3 active:scale-[0.98]"
			>
				<svg class="h-4 w-4 shrink-0 text-yellow-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
				</svg>
				<span>GitHub</span>
			</a>
		</div>
	</div>
</header>
