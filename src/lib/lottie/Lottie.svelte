<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';
	import type {
		AnimationConfig,
		AnimationDirection,
		AnimationItem,
		LottiePlayer,
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

	const lottiePromise = import('lottie-web');
	let lottie: LottiePlayer | undefined;
	void lottiePromise.then((l) => (lottie = l.default));
	$: if (lottie) load(lottie);

	let animation: AnimationItem | undefined;
	let contentDiv: HTMLDivElement | undefined;

	$: animation?.goToAndStop(frame, true);
	$: animation?.setDirection(direction);

	const load = (lottie: LottiePlayer) => {
		const pending = lottie.loadAnimation({
			animationData,
			autoplay: true,
			loop: true,
			...options,
			container: contentDiv!,
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
	};
</script>

<div
	class="lottie"
	style="
		--height: {css(height)};
		--width: {css(width)};
	"
>
	<div
		class="content"
		class:override={colourOverride}
		bind:this={contentDiv}
		style="
			{colourOverride ? `--colour-override: ${css(colourOverride)};` : ''}
		"
		class:loading={!animation}
	>
		<slot {animation} />
	</div>
</div>

<style lang="postcss">
	.lottie {
		height: var(--height);
		width: var(--width);

		overflow: hidden;

		& > .content {
			height: 100%;
			width: 100%;

			opacity: 1;

			transition: opacity 0.3s var(----ease-slow-slow);

			&.override :global(*) {
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
	}
</style>
