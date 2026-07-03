<script lang="ts">
interface Props {
	badge: string;
	title: string;
	description: string;
	imageSrc: string;
	imageAlt: string;
	mbClass?: string;
}

// biome-ignore lint/correctness/noUnusedVariables: props are used in template markup below
let { badge, title, description, imageSrc, imageAlt, mbClass = "mb-24" }: Props = $props();
</script>

<div class="mx-auto {mbClass} w-full max-w-[1100px] text-left">
	<div class="mb-6 max-w-2xl">
		<span class="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">{badge}</span>
		<h3 class="mt-3 mb-2 font-display text-2xl font-bold uppercase tracking-wide text-slate-50 md:text-3xl">{title}</h3>
		<p class="text-body-sm text-[#94a3b8]">{description}</p>
	</div>
	<div class="group relative w-full overflow-hidden rounded-2xl border border-[#1e293b]/60 bg-[#0b101e] shadow-2xl shadow-[#00F0FF]/5">
		<div class="relative overflow-hidden bg-[#080e1c]">
			<img src={imageSrc} alt={imageAlt} class="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]">
			<div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080e1c]/10 to-transparent ring-1 ring-inset ring-white/5"></div>
		</div>
	</div>
</div>
