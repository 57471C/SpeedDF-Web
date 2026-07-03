<script lang="ts">
interface Props {
	onOpenPrivacyModal: () => void;
}

// biome-ignore lint/correctness/noUnusedVariables: onOpenPrivacyModal is used in template markup below
let { onOpenPrivacyModal }: Props = $props();

// biome-ignore lint/correctness/noUnusedVariables: currentYear is used in template markup below
const currentYear = new Date().getFullYear();
</script>

<footer class="relative z-10 w-full border-t border-[#1e293b]/60 bg-[#080e1c]/90 py-8">
	<div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
		<div class="font-display text-sm font-bold text-slate-50">
			speed<span class="text-[#00F0FF]">DF</span>
		</div>
		<div class="flex flex-wrap justify-center gap-6 font-mono text-xs uppercase tracking-wider">
			<a class="text-[#94a3b8] transition-colors duration-150 hover:text-[#00F0FF]" href='https://github.com/57471C/speedDF/wiki'>Documentation</a>
			<button type="button" onclick={onOpenPrivacyModal} class="cursor-pointer text-[#94a3b8] transition-colors duration-150 hover:text-[#00F0FF]">Privacy</button>
			<a class="text-[#94a3b8] transition-colors duration-150 hover:text-[#00F0FF]" href='https://github.com/57471C/speedDF'>GitHub</a>
		</div>
		<div class="font-mono text-xs uppercase tracking-wider text-[#94a3b8]">
			© {currentYear} speedDF. Built for performance.
		</div>
	</div>
</footer>
