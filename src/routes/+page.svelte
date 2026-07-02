<script lang="ts">
// Svelte 5 state controlling the modal presentation layer
let showPrivacyModal = $state(false);

function openModal(e: Event) {
	e.preventDefault();
	showPrivacyModal = true;
}

function closeModal() {
	showPrivacyModal = false;
}

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Escape" && showPrivacyModal) {
		closeModal();
	}
}
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-50 w-full bg-[#080e1c]/80 backdrop-blur-md border-b border-[#1e293b]/60">
	<div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
		<div class="font-display font-bold text-2xl tracking-tight text-slate-50 cursor-pointer hover:text-primary transition-colors duration-150">
			speed<span class="text-primary text-[#00F0FF]">DF</span>
		</div>
		<div class="flex items-center gap-4">
			<a href="https://buymeacoffee.com/speeddf" target="_blank" rel="noreferrer" class="bg-yellow-500/10 text-yellow-500 border border-yellow-500/30 hover:bg-yellow-500/20 hover:border-yellow-500/60 transition-all duration-150 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full flex items-center gap-2">
				<span class="material-symbols-outlined text-sm">coffee</span>
				<span class="hidden sm:inline">Buy me a coffee</span>
			</a>
			<a href="https://github.com/57471C/speedDF" target="_blank" rel="noreferrer" class="bg-[#1e293b] border border-[#1e293b]/80 text-slate-200 hover:bg-[#334155] transition-all duration-150 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full flex items-center gap-2">
				<span class="material-symbols-outlined text-sm text-yellow-500">star</span>
				<span>GitHub</span>
			</a>
		</div>
	</div>
</header>

<main class="flex-grow relative z-10 flex flex-col items-center justify-center pt-24 pb-10 px-6">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.03)_0%,transparent_70%)] pointer-events-none z-0"></div>
	<div class="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
		<h1 class="font-display font-bold text-[44px] md:text-[68px] leading-[1.1] tracking-[-0.02em] text-white mb-6 max-w-4xl">
			The PDF editor that doesn't make you wait.
		</h1>
		<p class="font-body-lg text-[17px] md:text-[19px] leading-relaxed text-[#94a3b8] max-w-[620px] mb-12">
			A lightweight, blazing-fast, open-source desktop application designed to view, annotate, and manipulate PDF documents with zero lag.
		</p>
		
		<div class="flex flex-col sm:flex-row items-center gap-4 mb-20 w-full justify-center px-4">
			<a href="https://github.com/57471C/speedDF/releases/download/v0.9.2/speeddf_0.9.2_x64-setup.exe" 
			   class="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900/60 border border-[#2e3c54] hover:bg-[#334155] text-slate-100 px-8 py-3.5 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl group">
				<svg class="w-[18px] h-[18px] text-[#00F0FF]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<title>Windows Logo</title>
					<path d="M0 3.449L9.75 2.1v9.451H0V3.449zM10.949 1.95L24 0v11.4H10.949V1.95zM0 12.6h9.75v9.451L0 20.699V12.6zm10.949 0H24V24l-13.051-1.801V12.6z"/>
				</svg>
				<span class="text-xs uppercase tracking-wider font-mono">Windows</span>
				<span class="text-[10px] text-[#94a3b8]/60 font-mono tracking-tight group-hover:text-[#00F0FF] transition-colors">v0.9.2</span>
			</a>
			
			<a href="https://github.com/57471C/speedDF/releases/download/v0.9.2/speeddf_0.9.2_aarch64.dmg" 
			   class="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900/60 border border-[#2e3c54] hover:bg-[#334155] text-slate-100 px-8 py-3.5 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl group">
				<svg class="w-[22px] h-[22px] text-[#00F0FF]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<title>macOS Logo</title>
					<path d="M17.05 20.28c-.96 0-2.04-.6-3.22-.6-1.17 0-2.28.59-3.22.59-1.52 0-4.17-2.53-4.17-6.03 0-3.44 2.22-5.27 4.3 options-5.27 1.13 0 2.1.75 2.81.75.7 0 1.83-.83 3.1-.83 1.31 0 2.35.48 3.05 1.5-2.62 1.54-2.2 5.17.45 6.24-.6 1.5-1.38 2.98-2.1 3.65zM12.03 7.25c0-2.42 2.01-4.38 4.46-4.38.06 0 .12 0 .18.01-.1 2.45-2.14 4.34-4.59 4.34-.02 0-.04 0-.05-.01z"/>
				</svg>
				<span class="text-xs uppercase tracking-wider font-mono">macOS</span>
				<span class="text-[10px] text-[#94a3b8]/60 font-mono tracking-tight group-hover:text-[#00F0FF] transition-colors">v0.9.2</span>
			</a>
			
			<a href="https://github.com/57471C/speedDF/releases/download/v0.9.2/speeddf_0.9.2_amd64.AppImage" 
			   class="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900/60 border border-[#2e3c54] hover:bg-[#334155] text-slate-100 px-8 py-3.5 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 shadow-xl group">
				<svg class="w-[20px] h-[20px] text-[#00F0FF]" fill="currentColor" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
					<title>Linux Logo</title>
					<path d="M113.823 104.595c-1.795-1.478-3.629-2.921-5.308-4.525-1.87-1.785-3.045-3.944-2.789-6.678.147-1.573-.216-2.926-2.113-3.452.446-1.154.864-1.928 1.033-2.753.188-.92.178-1.887.204-2.834.264-9.96-3.334-18.691-8.663-26.835-2.454-3.748-5.017-7.429-7.633-11.066-4.092-5.688-5.559-12.078-5.633-18.981a47.564 47.564 0 00-1.081-9.475C80.527 11.956 77.291 7.233 71.422 4.7c-4.497-1.942-9.152-2.327-13.901-1.084-6.901 1.805-11.074 6.934-10.996 14.088.074 6.885.417 13.779.922 20.648.288 3.893-.312 7.252-2.895 10.34-2.484 2.969-4.706 6.172-6.858 9.397-1.229 1.844-2.317 3.853-3.077 5.931-2.07 5.663-3.973 11.373-7.276 16.5-1.224 1.9-1.363 4.026-.494 6.199.225.563.363 1.429.089 1.882-2.354 3.907-5.011 7.345-10.066 8.095-3.976.591-4.172 1.314-4.051 5.413.1 3.337.061 6.705-.28 10.021-.363 3.555.008 4.521 3.442 5.373 7.924 1.968 15.913 3.647 23.492 6.854 3.227 1.365 6.465.891 9.064-1.763 2.713-2.771 6.141-3.855 9.844-3.859 6.285-.005 12.572.298 18.86.369 1.702.02 2.679.653 3.364 2.199.84 1.893 2.26 3.284 4.445 3.526 4.193.462 8.013-.16 11.19-3.359 3.918-3.948 8.436-7.066 13.615-9.227 1.482-.619 2.878-1.592 4.103-2.648 2.231-1.922 2.113-3.146-.135-5z"/>
				</svg>
				<span class="text-xs uppercase tracking-wider font-mono">Linux</span>
				<span class="text-[10px] text-[#94a3b8]/60 font-mono tracking-tight group-hover:text-[#00F0FF] transition-colors">v0.9.2</span>
			</a>
		</div>
		
		<div class="w-full max-w-[1100px] mx-auto mb-24 text-left">
			<div class="mb-6 max-w-2xl">
				<span class="text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">01 / DOCUMENT VIEW</span>
				<h3 class="text-2xl md:text-3xl font-display font-bold text-slate-50 mt-3 mb-2 uppercase tracking-wide">Blazing-Fast Viewing</h3>
				<p class="text-body-sm text-[#94a3b8]">Open, scroll, and browse heavy PDF files instantly. A lightweight native engine designed with focus on readability and smooth performance.</p>
			</div>
			<div class="w-full overflow-hidden rounded-2xl border border-[#1e293b]/60 bg-[#0b101e] shadow-2xl shadow-[#00F0FF]/5 relative group">
				<div class="relative bg-[#080e1c] overflow-hidden">
					<img src="/assets/screenshots/mainView.png" alt="speedDF Main Document View" class="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]">
					<div class="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5 bg-gradient-to-t from-[#080e1c]/10 to-transparent"></div>
				</div>
			</div>
		</div>

		<div class="w-full max-w-[1100px] mx-auto mb-24 text-left">
			<div class="mb-6 max-w-2xl">
				<span class="text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">02 / ANNOTATION & MARKUP</span>
				<h3 class="text-2xl md:text-3xl font-display font-bold text-slate-50 mt-3 mb-2 uppercase tracking-wide">Rich Markup & Signatures</h3>
				<p class="text-body-sm text-[#94a3b8]">Highlight key text, sketch freehand, place geometric shapes, and add quick text markups. Securely sign or initial contracts locally in seconds.</p>
			</div>
			<div class="w-full overflow-hidden rounded-2xl border border-[#1e293b]/60 bg-[#0b101e] shadow-2xl shadow-[#00F0FF]/5 relative group">
				<div class="relative bg-[#080e1c] overflow-hidden">
					<img src="/assets/screenshots/markup.png" alt="speedDF Annotation and Markups" class="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]">
					<div class="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5 bg-gradient-to-t from-[#080e1c]/10 to-transparent"></div>
				</div>
			</div>
		</div>

		<div class="w-full max-w-[1100px] mx-auto mb-20 text-left">
			<div class="mb-6 max-w-2xl">
				<span class="text-xs font-mono uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">03 / DOCUMENT MANAGEMENT</span>
				<h3 class="text-2xl md:text-3xl font-display font-bold text-slate-50 mt-3 mb-2 uppercase tracking-wide">Multi-Page Grid Editor</h3>
				<p class="text-body-sm text-[#94a3b8]">Take control of your document structure. Effortlessly drag to reorganize, rotate, delete, or merge multiple pages in a visual dashboard layout.</p>
			</div>
			<div class="w-full overflow-hidden rounded-2xl border border-[#1e293b]/60 bg-[#0b101e] shadow-2xl shadow-[#00F0FF]/5 relative group">
				<div class="relative bg-[#080e1c] overflow-hidden">
					<img src="/assets/screenshots/gridView.png" alt="speedDF Grid View and Page Manager" class="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]">
					<div class="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/5 bg-gradient-to-t from-[#080e1c]/10 to-transparent"></div>
				</div>
			</div>
		</div>
	</div>
</main>

<section class="w-full pb-20 px-6 flex items-center justify-center relative z-10">
	<div class="max-w-7xl mx-auto w-full">
		<div class="mb-16 text-center">
			<h2 class="text-[32px] md:text-[44px] font-display font-bold mb-4 text-slate-50 uppercase tracking-wide leading-tight">Engineered for Speed</h2>
			<p class="text-body-lg text-[#94a3b8] max-w-2xl mx-auto">Uncompromising performance and privacy for your critical document workflows.</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
			<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.03)_0%,transparent_70%)] pointer-events-none -z-10"></div>
			
			<div class="bg-[#1e293b]/80 border border-[#1e293b]/40 rounded-2xl relative p-8 group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#00F0FF]/5">
				<div class="z-10 relative flex flex-col gap-4 mb-6">
					<div class="flex items-center gap-4">
						<span class="material-symbols-outlined text-[#00F0FF] text-3xl glow-text">bolt</span>
						<h3 class="text-xl font-display font-semibold text-slate-50 uppercase tracking-wide">Instant Load Times</h3>
					</div>
					<p class="text-body-sm text-[#94a3b8] leading-relaxed">Lightweight native execution engine. Zero splash screens, zero waiting.</p>
				</div>
			</div>
			
			<div class="bg-[#1e293b]/80 border border-[#1e293b]/40 rounded-2xl relative p-8 group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#00F0FF]/5">
				<div class="z-10 relative flex flex-col gap-4 mb-6">
					<div class="flex items-center gap-4">
						<span class="material-symbols-outlined text-[#00F0FF] text-3xl glow-text">shield</span>
						<h3 class="text-xl font-display font-semibold text-slate-50 uppercase tracking-wide">Privacy First</h3>
					</div>
					<p class="text-body-sm text-[#94a3b8] leading-relaxed">Local-only secure operations. Your sensitive file bytes never leave your machine.</p>
				</div>
			</div>
			
			<div class="bg-[#1e293b]/80 border border-[#1e293b]/40 rounded-2xl relative p-8 group flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#00F0FF]/5">
				<div class="z-10 relative flex flex-col gap-4 mb-6">
					<div class="flex items-center gap-4">
						<span class="material-symbols-outlined text-[#00F0FF] text-3xl glow-text">edit_document</span>
						<h3 class="text-xl font-display font-semibold text-slate-50 uppercase tracking-wide">Rich Markups</h3>
					</div>
					<p class="text-body-sm text-[#94a3b8] leading-relaxed">Hardware-accelerated rendering overlays for precise vector drawing and stamps.</p>
				</div>
			</div>
		</div>
	</div>
</section>

<footer class="bg-[#080e1c]/90 w-full py-8 border-t border-[#1e293b]/60 relative z-10">
	<div class="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-4">
		<div class="font-display font-bold text-sm text-slate-50">
			speed<span class="text-[#00F0FF]">DF</span>
		</div>
		<div class="flex flex-wrap gap-6 justify-center font-mono uppercase text-xs tracking-wider">
			<a class="text-[#94a3b8] hover:text-[#00F0FF] transition-colors duration-150" href="#docs">Documentation</a>
			<button onclick={openModal} class="text-[#94a3b8] hover:text-[#00F0FF] transition-colors duration-150 cursor-pointer">Privacy</button>
			<a class="text-[#94a3b8] hover:text-[#00F0FF] transition-colors duration-150" href="https://github.com/57471C/speedDF">GitHub</a>
		</div>
		<div class="font-mono text-xs text-[#94a3b8] uppercase tracking-wider">
			© 2026 speedDF. Built for performance.
		</div>
	</div>
</footer>

{#if showPrivacyModal}
	<div role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080e1c]/80 backdrop-blur-sm transition-opacity duration-300">
		<div class="relative w-full max-w-2xl bg-[#1e293b] border border-[rgba(0,240,255,0.15)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
			<div class="p-6 border-b border-[#1e293b] flex justify-between items-center bg-[#0f172a]/40">
				<h3 class="text-xl font-display font-bold text-slate-50 uppercase tracking-wide flex items-center gap-2">
					<span class="material-symbols-outlined text-[#00F0FF] glow-text">shield</span>
					Privacy Policy
				</h3>
				<button onclick={closeModal} class="text-[#94a3b8] hover:text-white transition-colors p-1 rounded-lg hover:bg-[#334155] flex items-center justify-center">
					<span class="material-symbols-outlined">close</span>
				</button>
			</div>
			
			<div class="p-6 overflow-y-auto space-y-6 text-body-sm text-[#94a3b8] leading-relaxed font-sans">
				<div>
					<h4 class="text-xs font-mono uppercase tracking-wider text-[#00F0FF] mb-2">Our Commitment to Privacy</h4>
					<p>speedDF is built on a <strong class="text-slate-200">privacy-first, local-only architecture</strong>. We believe your data belongs to you, and we have designed the application to ensure your files and activity remain private.</p>
				</div>
				
				<div>
					<h4 class="text-xs font-mono uppercase tracking-wider text-[#00F0FF] mb-2">1. Zero Data Collection</h4>
					<p>We do not collect, store, or transmit any user data, personal information, or document contents. When you view, annotate, reorganize, or edit PDFs using speedDF, all file processing happens exclusively on your local machine. No file bytes or metadata are ever uploaded to our servers or any third-party services.</p>
				</div>
				
				<div>
					<h4 class="text-xs font-mono uppercase tracking-wider text-[#00F0FF] mb-2">2. Network Activity</h4>
					<p>The application only initiates network requests in the following scenarios:</p>
					<ul class="list-disc pl-5 mt-2 space-y-1">
						<li><strong>Update Checks:</strong> The app may periodically query public API endpoints (like GitHub releases) or our official website to determine if a newer version of speedDF is available.</li>
						<li><strong>Support Inquiry Form (Opt-in):</strong> If you choose to manually submit support requests via this website, the email and description details you input will be received by us to help resolve your request.</li>
					</ul>
				</div>
				
				<div>
					<h4 class="text-xs font-mono uppercase tracking-wider text-[#00F0FF] mb-2">3. Third-Party Links</h4>
					<p>Our website contains links to external platforms such as GitHub and Buy Me a Coffee. These third-party sites have their own privacy policies, and we do not assume responsibility for their practices.</p>
				</div>
				
				<div class="pt-4 border-t border-[#1e293b] flex justify-between items-center text-xs font-mono">
					<span>Last Updated: July 2026</span>
					<span>Version 1.0</span>
                </div>
			</div>
		</div>
	</div>
{/if}