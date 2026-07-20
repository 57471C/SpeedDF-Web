<script lang="ts">
import PerformanceCard from "./PerformanceCard.svelte";
</script>

<section class="relative z-10 flex w-full items-center justify-center px-6 pb-20">
	<div class="mx-auto w-full max-w-7xl">
		<div class="mb-16 text-center">
			<h2 class="mb-4 font-display text-[32px] font-bold uppercase leading-tight tracking-wide text-slate-50 md:text-[44px]">Engineered for Speed</h2>
			<p class="text-body-lg text-[#94a3b8] max-w-2xl mx-auto">Uncompromising performance and privacy for your critical document workflows.</p>
		</div>
		<div class="relative grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.03)_0%,transparent_70%)]"></div>
			
			<PerformanceCard
				icon="bolt"
				title="Instant Load Times"
				description="Lightweight native execution engine. Zero splash screens, zero waiting."
			/>
			
			<PerformanceCard
				icon="shield"
				title="Privacy First"
				description="Local-only secure operations. Your sensitive file bytes never leave your machine."
			/>
			
			<PerformanceCard
				icon="edit_document"
				title="Rich Markups"
				description="Hardware-accelerated rendering overlays for precise vector drawing and stamps."
			/>
		</div>
	</div>
</section>
