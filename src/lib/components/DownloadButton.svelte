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

<a {href} class="group flex w-full items-center justify-center gap-3 rounded-full border border-[#2e3c54] bg-slate-900/60 px-8 py-3.5 text-slate-100 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#334155] sm:w-auto">
	{@render children()}
	<span class="font-mono text-xs uppercase tracking-wider">{osName}</span>
	<span class="font-mono text-[10px] tracking-tight text-[#94a3b8]/60 transition-colors group-hover:text-[#00F0FF]">{version}</span>
</a>
