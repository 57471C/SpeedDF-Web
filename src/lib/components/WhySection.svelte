<script lang="ts">
import LeanStudioCredit from "./LeanStudioCredit.svelte";
</script>

<section class="w-full border-y border-border-dark py-16 md:py-20" aria-labelledby="why-heading">
	<div class="mx-auto max-w-2xl">
		<h2 id="why-heading" class="font-display text-2xl font-bold tracking-tight text-slate-50 md:text-3xl">
			Why it exists
		</h2>
		<p class="mt-6 text-lg leading-relaxed text-slate-200 md:text-xl">
			Most PDF tools are bloated, locked behind a subscription, or quietly send your files somewhere else.
			speedDF is the opposite — fully local, open source, and built because the existing options were annoying enough to replace.
		</p>
		<p class="mt-4 text-base leading-relaxed text-text-secondary">
			Dark or light. Same small install. Work stays on your machine.
		</p>
		<div class="mt-6">
			<LeanStudioCredit prefix="Powered by" size="xs" showIcon={false} />
		</div>
	</div>
</section>
