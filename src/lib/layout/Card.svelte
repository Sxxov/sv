<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';

	export let height: TCss = '100%';
	export let width: TCss = '100%';
	export let colourBackground: TCss = '----colour-background-primary';
	export let shadowBackground: TCss = '----shadow-2xl';
	export let shadowInner: TCss = '----shadow-inner-2xl';
	export let roundness: TCss = '----roundness';
	export let clickable = true;
</script>

<div
	class="component"
	class:clickable
	style="
		--height: {css(height)};
		--width: {css(width)};
		--colour-background: {css(colourBackground)};
		--shadow-background: {css(shadowBackground)};
		--shadow-inner: {css(shadowInner)};
		--border-radius: {css(roundness)};
	"
>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="postcss">
	.component {
		height: var(--height);
		width: var(--width);

		background: var(--colour-background);
		box-shadow: var(--shadow-background);

		border-radius: var(--border-radius);

		transition: box-shadow 0.3s var(----ease-fast-slow);

		&.clickable:active {
			box-shadow: var(--shadow-none);

			& > .content {
				box-shadow: var(--shadow-inner-none);
			}
		}

		& > .content {
			height: 100%;
			width: 100%;

			border-radius: var(--border-radius);

			box-shadow: var(--shadow-inner);

			transition: box-shadow 0.3s var(----ease-fast-slow);
		}
	}
</style>
