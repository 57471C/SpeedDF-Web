<script lang="ts">
interface Props {
	closeModal: () => void;
}

// biome-ignore lint/correctness/noUnusedVariables: closeModal is used in template markup below
let { closeModal }: Props = $props();
</script>

<div
	role="dialog"
	aria-modal="true"
	aria-labelledby="privacy-title"
	class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
>
	<div class="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-card-border bg-surface-2 shadow-2xl">
		<div class="flex items-center justify-between border-b border-border-dark bg-surface-1/50 p-6">
			<h3 id="privacy-title" class="font-display text-xl font-bold tracking-tight text-slate-50">
				Privacy
			</h3>
			<button
				type="button"
				onclick={closeModal}
				class="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-surface-3 hover:text-white active:scale-[0.98]"
				aria-label="Close privacy policy"
			>
				<span class="text-lg leading-none" aria-hidden="true">×</span>
			</button>
		</div>

		<div class="space-y-6 overflow-y-auto p-6 font-sans text-sm leading-relaxed text-text-secondary">
			<div>
				<h4 class="mb-2 font-display text-sm font-semibold text-slate-50">Local by design</h4>
				<p>
					speedDF is a local-only app. Your files and activity stay on your machine. We do not collect, store, or transmit document contents.
				</p>
			</div>

			<div>
				<h4 class="mb-2 font-display text-sm font-semibold text-slate-50">What never leaves your PC</h4>
				<p>
					When you view, annotate, reorganize, edit, or run OCR on PDFs, all processing happens on-device. No file bytes, document metadata, or recognized text are uploaded to our servers or third-party services.
				</p>
			</div>

			<div>
				<h4 class="mb-2 font-display text-sm font-semibold text-slate-50">OCR models</h4>
				<p>
					Optional OCR downloads small model files <strong class="text-slate-200">once</strong> the first time you use that feature. After that, the models live on your disk and every recognition run stays offline — page images and extracted text never leave your machine.
				</p>
			</div>

			<div>
				<h4 class="mb-2 font-display text-sm font-semibold text-slate-50">Network activity</h4>
				<p>The app only talks to the network in these cases:</p>
				<ul class="mt-2 list-disc space-y-1 pl-5">
					<li>
						<strong class="text-slate-200">OCR model download (one-time):</strong> if you use OCR and the models are not already cached, the app fetches them so recognition can run fully offline afterwards.
					</li>
					<li>
						<strong class="text-slate-200">Update checks:</strong> optional queries to public release endpoints (for example GitHub) or this site to see if a newer version exists.
					</li>
					<li>
						<strong class="text-slate-200">Support you start:</strong> if you email or submit a support request yourself, only the details you choose to send are received.
					</li>
				</ul>
			</div>

			<div>
				<h4 class="mb-2 font-display text-sm font-semibold text-slate-50">Third-party links</h4>
				<p>
					This site links to GitHub and Buy Me a Coffee. Those sites have their own policies; we do not control them.
				</p>
			</div>

			<p class="border-t border-border-dark pt-4 font-mono text-xs text-text-secondary/80">
				Last updated July 2026
			</p>
		</div>
	</div>
</div>
