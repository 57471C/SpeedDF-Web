<script lang="ts">
import "../app.css";
import type { Snippet } from "svelte";

interface Props {
	children: Snippet;
}

// biome-ignore lint/correctness/noUnusedVariables: children is rendered in the template markup below
let { children }: Props = $props();
</script>

<div class="min-h-screen flex flex-col bg-cyber-grid">
	{@render children()}
</div>