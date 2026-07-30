<script lang="ts">
interface Spec {
	label: string;
	value: string;
}

const specs: Spec[] = [
	{ label: "Install size", value: "~12 MB (Windows)" },
	{ label: "Privacy", value: "Local-only" },
	{ label: "License", value: "MIT" },
	{ label: "Stack", value: "Tauri 2 + Rust" },
	{ label: "Platforms", value: "Win / macOS / Linux" },
	{ label: "Accounts", value: "None" },
];
</script>

<section class="w-full py-14 md:py-16" aria-labelledby="specs-heading">
	<h2 id="specs-heading" class="mb-8 font-display text-xl font-bold tracking-tight text-slate-50 md:text-2xl">
		The boring facts that matter
	</h2>

	<ul class="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-dark bg-border-dark sm:grid-cols-3 lg:grid-cols-6">
		{#each specs as spec (spec.label)}
			<li class="flex flex-col gap-1 bg-surface-1 px-4 py-5 sm:px-5">
				<span class="font-mono text-[11px] uppercase tracking-wider text-text-secondary">{spec.label}</span>
				<span class="font-display text-sm font-semibold text-slate-50 md:text-base">{spec.value}</span>
			</li>
		{/each}
	</ul>
</section>
