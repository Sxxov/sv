<script lang="ts">
	import { css, type Css } from '@sxxov/ut/css';

	export let height: Css = '100%';
	export let width: Css = '100%';
	export let colourBackground: Css = '----colour-background-primary';
	export let shadowBackground: Css = '----shadow-2xl';
	export let shadowInner: Css = '----shadow-inner-2xl';
	export let roundness: Css = '----roundness';
	export let clickable = true;
</script>

<div
	class="card"
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
	.card {
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
