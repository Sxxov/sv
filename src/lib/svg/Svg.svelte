<script lang="ts">
	import { css, type Css } from '@sxxov/ut/css';
	import type { SvgString } from '@sxxov/ut/types';

	export let height: Css = '16px';
	export let width: Css = '24px';
	export let svg: SvgString;
	export let colour: Css = 'currentColor';
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
