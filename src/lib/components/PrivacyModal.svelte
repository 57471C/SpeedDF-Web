<script lang="ts">
interface Props {
	closeModal: () => void;
}

// biome-ignore lint/correctness/noUnusedVariables: closeModal is used in template markup below
let { closeModal }: Props = $props();
</script>

<div role='dialog' aria-modal='true' class="fixed inset-0 z-50 flex items-center justify-center bg-[#080e1c]/80 p-4 backdrop-blur-sm transition-opacity duration-300">
	<div class="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[rgba(0,240,255,0.15)] bg-[#1e293b] shadow-2xl">
		<div class="flex items-center justify-between border-b border-[#1e293b] bg-[#0f172a]/40 p-6">
			<h3 class="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wide text-slate-50">
				<span class="glow-text text-[#00F0FF] material-symbols-outlined">shield</span>
				Privacy Policy
			</h3>
			<button type="button" onclick={closeModal} class="flex items-center justify-center rounded-lg p-1 text-[#94a3b8] transition-colors hover:bg-[#334155] hover:text-white" aria-label='Close privacy policy'>
				<span class="material-symbols-outlined">close</span>
			</button>
		</div>
		
		<div class="space-y-6 overflow-y-auto p-6 font-sans leading-relaxed text-body-sm text-[#94a3b8]">
			<div>
				<h4 class="mb-2 font-mono text-xs uppercase tracking-wider text-[#00F0FF]">Our Commitment to Privacy</h4>
				<p>speedDF is built on a <strong class="text-slate-200">privacy-first, local-only architecture</strong>. We believe your data belongs to you, and we have designed the application to ensure your files and activity remain private.</p>
			</div>
			
			<div>
				<h4 class="mb-2 font-mono text-xs uppercase tracking-wider text-[#00F0FF]">1. Zero Data Collection</h4>
				<p>We do not collect, store, or transmit any user data, personal information, or document contents. When you view, annotate, reorganize, or edit PDFs using speedDF, all file processing happens exclusively on your local machine. No file bytes or metadata are ever uploaded to our servers or any third-party services.</p>
			</div>
			
			<div>
				<h4 class="mb-2 font-mono text-xs uppercase tracking-wider text-[#00F0FF]">2. Network Activity</h4>
				<p>The application only initiates network requests in the following scenarios:</p>
				<ul class="mt-2 list-disc space-y-1 pl-5">
					<li><strong>Update Checks:</strong> The app may periodically query public API endpoints (like GitHub releases) or our official website to determine if a newer version of speedDF is available.</li>
					<li><strong>Support Inquiry Form (Opt-in):</strong> If you choose to manually submit support requests via this website, the email and description details you input will be received by us to help resolve your request.</li>
				</ul>
			</div>
			
			<div>
				<h4 class="mb-2 font-mono text-xs uppercase tracking-wider text-[#00F0FF]">3. Third-Party Links</h4>
				<p>Our website contains links to external platforms such as GitHub and Buy Me a Coffee. These third-party sites have their own privacy policies, and we do not assume responsibility for their practices.</p>
			</div>
			
			<div class="flex items-center justify-between border-t border-[#1e293b] pt-4 font-mono text-xs">
				<span>Last Updated: July 2024</span>
				<span>Version 1.0</span>
            </div>
		</div>
	</div>
</div>
