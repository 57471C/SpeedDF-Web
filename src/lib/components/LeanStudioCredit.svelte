<script lang="ts">
interface Props {
	/** Quiet prefix before the mark, e.g. "Powered by" or "by". */
	prefix?: string;
	/** Visual scale — footer uses sm; header can go md. */
	size?: "xs" | "sm" | "md";
	/** Extra classes on the wordmark (e.g. hide label on narrow headers). */
	wordmarkClass?: string;
	/** Show the square L.S SVG mark. Footer uses wordmark-only. */
	showIcon?: boolean;
}

// biome-ignore lint/correctness/noUnusedVariables: props used in template
let { prefix = "Powered by", size = "sm", wordmarkClass = "", showIcon = true }: Props = $props();

const textSize = $derived(
	size === "xs" ? "text-[11px]" : size === "md" ? "text-sm" : "text-xs",
);
const iconClass = $derived(
	size === "xs" ? "h-3.5 w-3.5" : size === "md" ? "h-5 w-5" : "h-4 w-4",
);
</script>

<a
	href="https://lean.studio"
	target="_blank"
	rel="noreferrer"
	class="group inline-flex items-center gap-1.5 {textSize} leading-none text-text-secondary/70 transition-opacity duration-150 hover:opacity-90"
	aria-label={prefix ? `${prefix} LEAN.STUDIO` : "LEAN.STUDIO"}
>
	{#if prefix}
		<span class="font-mono tracking-wide transition-colors duration-150 group-hover:text-primary">{prefix}</span>
	{/if}

	{#if showIcon}
		<!-- Inline mark so Varela Round from the page stylesheet applies to the L / .S glyphs -->
		<svg
			class="{iconClass} shrink-0 opacity-90 transition-opacity duration-150 group-hover:opacity-100"
			viewBox="0 0 96 96"
			fill-rule="evenodd"
			clip-rule="evenodd"
			aria-hidden="true"
			focusable="false"
		>
			<g transform="matrix(0.981963,0,0,0.982657,0.799168,0.799168)">
				<path
					d="M96,22L96,74C96,86.142 86.142,96 74,96L22,96C9.858,96 0,86.142 0,74L0,22C0,9.858 9.858,0 22,0L74,0C86.142,0 96,9.858 96,22Z"
					fill="none"
					stroke="#808080"
					stroke-width="1.35"
				/>
			</g>
			<g transform="matrix(1.397631,0,0,1.397631,4.806248,61.930253)">
				<text
					x="0"
					y="0"
					font-family="Varela Round, system-ui, sans-serif"
					font-size="45.792"
					fill="#ffffff"
				>L</text>
			</g>
			<g transform="matrix(1.397631,0,0,1.397631,42.670163,61.930253)">
				<text
					x="0"
					y="0"
					font-family="Varela Round, system-ui, sans-serif"
					font-size="37.206"
					fill="#808080"
				>.S</text>
			</g>
			<path
				d="M23.388,77.519L23.388,81.207C23.388,82.224 22.562,83.05 21.545,83.05L17.858,83.05C16.84,83.05 16.014,82.224 16.014,81.207L16.014,77.519C16.014,76.502 16.84,75.676 17.858,75.676L21.545,75.676C22.562,75.676 23.388,76.502 23.388,77.519Z"
				fill="#e97132"
			/>
			<path
				d="M37.596,77.519L37.596,81.207C37.596,82.224 36.77,83.05 35.753,83.05L32.066,83.05C31.048,83.05 30.222,82.224 30.222,81.207L30.222,77.519C30.222,76.502 31.048,75.676 32.066,75.676L35.753,75.676C36.77,75.676 37.596,76.502 37.596,77.519Z"
				fill="#781e6e"
			/>
			<path
				d="M51.804,77.519L51.804,81.207C51.804,82.224 50.978,83.05 49.961,83.05L46.274,83.05C45.256,83.05 44.43,82.224 44.43,81.207L44.43,77.519C44.43,76.502 45.256,75.676 46.274,75.676L49.961,75.676C50.978,75.676 51.804,76.502 51.804,77.519Z"
				fill="#c00000"
			/>
			<path
				d="M66.012,77.519L66.012,81.207C66.012,82.224 65.186,83.05 64.169,83.05L60.481,83.05C59.464,83.05 58.638,82.224 58.638,81.207L58.638,77.519C58.638,76.502 59.464,75.676 60.481,75.676L64.169,75.676C65.186,75.676 66.012,76.502 66.012,77.519Z"
				fill="#0070c0"
			/>
			<path
				d="M80.22,77.519L80.22,81.207C80.22,82.224 79.394,83.05 78.377,83.05L74.689,83.05C73.672,83.05 72.846,82.224 72.846,81.207L72.846,77.519C72.846,76.502 73.672,75.676 74.689,75.676L78.377,75.676C79.394,75.676 80.22,76.502 80.22,77.519Z"
				fill="#c0be00"
			/>
		</svg>
	{/if}

	<span class="font-lean tracking-wide {wordmarkClass}" aria-hidden="true">
		<span class="text-white transition-colors duration-150 group-hover:text-primary">LEAN</span><span
			class="text-[0.78em] text-[#808080] transition-colors duration-150 group-hover:text-primary/70"
			>.STUDIO</span
		>
	</span>
</a>
