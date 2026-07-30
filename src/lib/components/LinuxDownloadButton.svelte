<script lang="ts">
import type { Snippet } from "svelte";

interface Props {
	appImageUrl: string;
	debUrl?: string;
	rpmUrl?: string;
	version: string;
	children: Snippet;
}

// biome-ignore lint/correctness/noUnusedVariables: props are used in template markup below
let { appImageUrl, debUrl = "", rpmUrl = "", version, children }: Props = $props();

let open = $state(false);
let rootEl: HTMLDivElement | undefined = $state();

const hasAlternates = $derived(Boolean(debUrl || rpmUrl));

function toggleMenu(e: MouseEvent) {
	e.preventDefault();
	e.stopPropagation();
	open = !open;
}

function closeMenu() {
	open = false;
}

function onWindowClick(e: MouseEvent) {
	if (!open || !rootEl) return;
	if (!rootEl.contains(e.target as Node)) {
		closeMenu();
	}
}

function onWindowKeydown(e: KeyboardEvent) {
	if (e.key === "Escape" && open) {
		closeMenu();
	}
}

const baseBtn =
	"flex items-center justify-center gap-3 border border-btn-border bg-surface-2 text-slate-100 transition-all duration-200 hover:border-primary/40 hover:bg-surface-3 active:scale-[0.98]";
</script>

<svelte:window onclick={onWindowClick} onkeydown={onWindowKeydown} />

<div class="relative w-full sm:w-auto" bind:this={rootEl}>
	{#if hasAlternates}
		<div class="group flex w-full overflow-hidden rounded-full border border-btn-border bg-surface-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-surface-3 sm:w-auto">
			<a
				href={appImageUrl}
				class="flex min-w-0 flex-1 items-center justify-center gap-3 px-5 py-3 text-slate-100 active:scale-[0.98] sm:px-6"
			>
				{@render children()}
				<span class="font-mono text-xs uppercase tracking-wider">Linux</span>
				<span class="font-mono text-[10px] tracking-tight text-text-secondary/70 transition-colors group-hover:text-primary">{version}</span>
			</a>
			<button
				type="button"
				class="flex shrink-0 items-center justify-center px-2.5 py-3 text-slate-100 active:scale-[0.98]"
				aria-label="Choose Linux package format"
				aria-haspopup="menu"
				aria-expanded={open}
				onclick={toggleMenu}
			>
				<svg
					class="h-3.5 w-3.5 text-text-secondary transition-transform duration-150 {open ? 'rotate-180 text-primary' : ''}"
					viewBox="0 0 12 12"
					fill="none"
					aria-hidden="true"
				>
					<path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		</div>

		{#if open}
			<div
				role="menu"
				class="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 min-w-[14rem] overflow-hidden rounded-xl border border-border-dark bg-surface-1 py-1 shadow-xl shadow-black/40 sm:left-auto sm:right-0 sm:w-56"
			>
				<a
					role="menuitem"
					href={appImageUrl}
					class="flex flex-col gap-0.5 px-4 py-2.5 transition-colors hover:bg-surface-2"
					onclick={closeMenu}
				>
					<span class="font-display text-sm font-medium text-slate-50">AppImage</span>
					<span class="font-mono text-[10px] uppercase tracking-wider text-primary">Recommended</span>
				</a>

				{#if debUrl}
					<a
						role="menuitem"
						href={debUrl}
						class="flex flex-col gap-0.5 border-t border-border-dark/80 px-4 py-2.5 transition-colors hover:bg-surface-2"
						onclick={closeMenu}
					>
						<span class="font-display text-sm font-medium text-slate-50">.deb</span>
						<span class="font-mono text-[10px] text-text-secondary">Debian / Ubuntu</span>
					</a>
				{/if}

				{#if rpmUrl}
					<a
						role="menuitem"
						href={rpmUrl}
						class="flex flex-col gap-0.5 border-t border-border-dark/80 px-4 py-2.5 transition-colors hover:bg-surface-2"
						onclick={closeMenu}
					>
						<span class="font-display text-sm font-medium text-slate-50">.rpm</span>
						<span class="font-mono text-[10px] text-text-secondary">Fedora / RHEL</span>
					</a>
				{/if}
			</div>
		{/if}
	{:else}
		<a
			href={appImageUrl}
			class="group {baseBtn} w-full rounded-full px-6 py-3 hover:-translate-y-0.5 sm:w-auto"
		>
			{@render children()}
			<span class="font-mono text-xs uppercase tracking-wider">Linux</span>
			<span class="font-mono text-[10px] tracking-tight text-text-secondary/70 transition-colors group-hover:text-primary">{version}</span>
		</a>
	{/if}
</div>
