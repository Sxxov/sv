<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';
	import type { TSvgString } from '@sxxov/ut/types';

	export let height: TCss = '16px';
	export let width: TCss = '24px';
	export let svg: TSvgString;
	export let colour: TCss = 'currentColor';
	export let firm = false;
</script>

<div
	class="svg"
	class:firm
	style="
		--colour-svg: {css(colour)};
		--height-svg: {css(height)};
		--width-svg: {css(width)};
	"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html svg}
</div>

<style lang="postcss">
	.svg {
		display: contents;

		/* required to prevent bug in button, where it fires a mousedown but not a click, sometimes */
		pointer-events: none;

		fill: var(--colour-svg);
		color: var(--colour-svg);

		& > :global(svg) {
			display: block;
			height: var(--height-svg);
			width: var(--width-svg);
		}

		&.firm > :global(svg) {
			min-height: var(--height-svg);
			min-width: var(--width-svg);
		}
	}
</style>
