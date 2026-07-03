<script lang="ts">
interface Props {
	winDownload: string;
	macDownload: string;
	linuxDownload: string;
	version: string;
}

// biome-ignore lint/correctness/noUnusedVariables: props are used in template markup below
let { winDownload, macDownload, linuxDownload, version }: Props = $props();
</script>

<h1 class="mb-6 max-w-4xl font-display text-[44px] font-bold leading-[1.1] tracking-[-0.02em] text-white md:text-[68px]">
	The PDF editor that doesn't make you wait.
</h1>
<p class="mb-12 max-w-[620px] font-body-lg text-[17px] leading-relaxed text-[#94a3b8] md:text-[19px]">
	A lightweight, blazing-fast, open-source desktop application designed to view, annotate, and manipulate PDF documents with zero lag.
</p>

<div class="mb-20 flex w-full flex-col items-center justify-center gap-4 px-4 sm:flex-row">
	<a href={winDownload} 
	   class="group flex w-full items-center justify-center gap-3 rounded-full border border-[#2e3c54] bg-slate-900/60 px-8 py-3.5 text-slate-100 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#334155] sm:w-auto">
		<svg class="h-[18px] w-[18px] text-[#00F0FF]" fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
			<title>Windows Logo</title>
			<path d='M0 3.449L9.75 2.1v9.451H0V3.449zM10.949 1.95L24 0v11.4H10.949V1.95zM0 12.6h9.75v9.451L0 20.699V12.6zm10.949 0H24V24l-13.051-1.801V12.6z'/>
		</svg>
		<span class="font-mono text-xs uppercase tracking-wider">Windows</span>
		<span class="font-mono text-[10px] tracking-tight text-[#94a3b8]/60 transition-colors group-hover:text-[#00F0FF]">{version}</span>
	</a>
	
	<a href={macDownload}
	   class="group flex w-full items-center justify-center gap-3 rounded-full border border-[#2e3c54] bg-slate-900/60 px-8 py-3.5 text-slate-100 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#334155] sm:w-auto">
		<svg class="h-[22px] w-[22px] text-[#00F0FF]" fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
			<title>macOS Logo</title>
			<path d='M17.05 20.28c-.96 0-2.04-.6-3.22-.6-1.17 0-2.28.59-3.22.59-1.52 0-4.17-2.53-4.17-6.03 0-3.44 2.22-5.27 4.3-5.27 1.13 0 2.1.75 2.81.75.7 0 1.83-.83 3.1-.83 1.31 0 2.35.48 3.05 1.5-2.62 1.54-2.2 5.17.45 6.24-.6 1.5-1.38 2.98-2.1 3.65zM12.03 7.25c0-2.42 2.01-4.38 4.46-4.38.06 0 .12 0 .18.01-.1 2.45-2.14 4.34-4.59 4.34-.02 0-.04 0-.05-.01z'/>
		</svg>
		<span class="font-mono text-xs uppercase tracking-wider">macOS</span>
		<span class="font-mono text-[10px] tracking-tight text-[#94a3b8]/60 transition-colors group-hover:text-[#00F0FF]">{version}</span>
	</a>
	
	<a href={linuxDownload} 
	   class="group flex w-full items-center justify-center gap-3 rounded-full border border-[#2e3c54] bg-slate-900/60 px-8 py-3.5 text-slate-100 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#334155] sm:w-auto">
		<svg class="h-[20px] w-[20px] text-[#00F0FF]" fill='currentColor' viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'>
			<title>Linux Logo</title>
			<path d='M113.823 104.595c-1.795-1.478-3.629-2.921-5.308-4.525-1.87-1.785-3.045-3.944-2.789-6.678.147-1.573-.216-2.926-2.113-3.452.446-1.154.864-1.928 1.033-2.753.188-.92.178-1.887.204-2.834.264-9.96-3.334-18.691-8.663-26.835-2.454-3.748-5.017-7.429-7.633-11.066-4.092-5.688-5.559-12.078-5.633-18.981a47.564 47.564 0 00-1.081-9.475C80.527 11.956 77.291 7.233 71.422 4.7c-4.497-1.942-9.152-2.327-13.901-1.084-6.901 1.805-11.074 6.934-10.996 14.088.074 6.885.417 13.779.922 20.648.288 3.893-.312 7.252-2.895 10.34-2.484 2.969-4.706 6.172-6.858 9.397-1.229 1.844-2.317 3.853-3.077 5.931-2.07 5.663-3.973 11.373-7.276 16.5-1.224 1.9-1.363 4.026-.494 6.199.225.563.363 1.429.089 1.882-2.354 3.907-5.011 7.345-10.066 8.095-3.976.591-4.172 1.314-4.051 5.413.1 3.337.061 6.705-.28 10.021-.363 3.555.008 4.521 3.442 5.373 7.924 1.968 15.913 3.647 23.492 6.854 3.227 1.365 6.465.891 9.064-1.763 2.713-2.771 6.141-3.855 9.844-3.859 6.285-.005 12.572.298 18.86.369 1.702.02 2.679.653 3.364 2.199.84 1.893 2.26 3.284 4.445 3.526 4.193.462 8.013-.16 11.19-3.359 3.918-3.948 8.436-7.066 13.615-9.227 1.482-.619 2.878-1.592 4.103-2.648 2.231-1.922 2.113-3.146-.135-5z'/>
		</svg>
		<span class="font-mono text-xs uppercase tracking-wider">Linux</span>
		<span class="font-mono text-[10px] tracking-tight text-[#94a3b8]/60 transition-colors group-hover:text-[#00F0FF]">{version}</span>
	</a>
</div>
