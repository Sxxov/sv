<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';
	import type { TSvgString } from '@sxxov/ut/types';

	export let height: TCss = '16px';
	export let width: TCss = '24px';
	export let svg: TSvgString;
	export let colour: TCss = '----colour-text-primary';
</script>

<div
	class="component"
	style="
		--colour-svg: {css(colour)};
		--height-svg: {css(height)};
		--width-svg: {css(width)};
	"
>
	{@html svg}
</div>

<style lang="postcss">
	.component {
		display: contents;

		/* required to prevent bug in button, where it fires a mousedown but not a click, sometimes */
		pointer-events: none;

		fill: var(--colour-svg);

		transition: fill 0.2s var(----ease-fast-slow);

		& > :global(svg) {
			display: block;
			height: var(--height-svg);
			width: var(--width-svg);
		}
	}
</style>
