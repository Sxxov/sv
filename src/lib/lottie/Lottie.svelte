<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';
	import type {
		AnimationConfig,
		AnimationDirection,
		AnimationItem,
	} from 'lottie-web';
	import { onMount } from 'svelte';

	export let frame = 0;
	export let animationData: Record<any, any>;
	export let height: TCss = '100%';
	export let width: TCss = '100%';
	export let options: Pick<
		AnimationConfig<'canvas' | 'svg' | 'html'>,
		Exclude<keyof AnimationConfig, 'container'>
	> = {};
	export let direction: AnimationDirection = 1;
	export let colourOverride: TCss = '';

	let animation: AnimationItem | undefined;
	let contentDiv: HTMLDivElement;

	$: animation?.goToAndStop(frame, true);
	$: animation?.setDirection(direction);

	onMount(async () => {
		const { default: lottie } = await import('lottie-web');

		const pending = lottie.loadAnimation({
			animationData,
			autoplay: true,
			loop: true,
			...options,
			container: contentDiv,
		});

		const onDomLoaded = () => {
			animation = pending;

			pending.removeEventListener('DOMLoaded', onDomLoaded);
		};

		pending.addEventListener('DOMLoaded', onDomLoaded);

		return () => {
			pending.removeEventListener('DOMLoaded', onDomLoaded);
			pending.destroy();
		};
	});
</script>

<div
	_="<Lottie>"
	class="component"
	style="
		--height: {css(height)};
		--width: {css(width)};
	"
>
	<div
		class="content"
		bind:this={contentDiv}
		style="
			--colour-override: {css(colourOverride)};
		"
		class:loading={!animation}
	>
		<slot {animation} />
	</div>
</div>

<style lang="postcss">
	.component {
		height: var(--height);
		width: var(--width);

		overflow: hidden;
	}

	.content {
		opacity: 1;

		transition: opacity 0.3s var(----ease-slow-slow);

		& :global(*) {
			fill: var(--colour-override);
			stroke: var(--colour-override);
		}

		&.loading {
			opacity: 0;
		}

		& > :global(svg) {
			display: block;
		}
	}
</style>
