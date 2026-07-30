<script lang="ts">
interface Props {
	size?: "sm" | "md";
	href?: string | null;
}

// biome-ignore lint/correctness/noUnusedVariables: props used in template
let { size = "md", href = "/" }: Props = $props();

const iconClass = $derived(size === "sm" ? "h-6 w-6" : "h-7 w-7");
const textClass = $derived(
	size === "sm"
		? "text-lg font-bold"
		: "text-xl font-bold tracking-tight",
);
</script>

{#snippet mark()}
	<img
		src="/favicon.svg"
		alt=""
		width="28"
		height="28"
		class="{iconClass} shrink-0 rounded-md"
		aria-hidden="true"
	/>
	<span class="font-display {textClass} text-slate-50">
		speed<span class="text-primary">DF</span>
	</span>
{/snippet}

{#if href}
	<a
		{href}
		class="inline-flex items-center gap-2.5 transition-opacity duration-150 hover:opacity-90"
	>
		{@render mark()}
	</a>
{:else}
	<div class="inline-flex items-center gap-2.5">
		{@render mark()}
	</div>
{/if}
