<script lang="ts">
interface Props {
	icon: string;
	title: string;
	description: string;
}

let { icon, title, description }: Props = $props();
</script>

<div class="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1e293b]/40 bg-[#1e293b]/80 p-8 transition-all duration-300 hover:shadow-xl hover:shadow-[#00F0FF]/5">
	<div class="relative z-10 mb-6 flex flex-col gap-4">
		<div class="flex items-center gap-4">
			<span class="glow-text text-3xl text-[#00F0FF] material-symbols-outlined">{icon}</span>
			<h3 class="font-display text-xl font-semibold uppercase tracking-wide text-slate-50">{title}</h3>
		</div>
		<p class="leading-relaxed text-body-sm text-[#94a3b8]">{description}</p>
	</div>
</div>
