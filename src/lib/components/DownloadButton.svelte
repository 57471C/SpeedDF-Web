<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	href: string;
	osName: string;
	version: string;
	children: Snippet;
}

// biome-ignore lint/correctness/noUnusedVariables: props are used in template markup below
let { href, osName, version, children }: Props = $props();
</script>

<a {href} class="group flex w-full items-center justify-center gap-3 rounded-full border border-btn-border bg-surface-2 px-6 py-3 text-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface-3 active:scale-[0.98] sm:w-auto">
	{@render children()}
	<span class="font-mono text-xs uppercase tracking-wider">{osName}</span>
	<span class="font-mono text-[10px] tracking-tight text-text-secondary/70 transition-colors group-hover:text-primary">{version}</span>
</a>
