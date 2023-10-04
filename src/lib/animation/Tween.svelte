<script lang="ts">
	import {
		Tween,
		type TimelineAt,
		type AnimatableIterationCount,
	} from '@sxxov/ut/animation';
	import type { ReadableBezier } from '@sxxov/ut/bezier';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { compositionContextKey } from '.';
	import type { CompositionContext } from './CompositionContext';

	export let start: number;
	export let end: number;
	export let duration: number;
	export let bezier: ReadableBezier | undefined = undefined;
	export let at: TimelineAt = undefined;
	// eslint-disable-next-line @typescript-eslint/ban-types
	export let autoplay: boolean | AnimatableIterationCount | (number & {}) = 0;

	const tween = new Tween(start, end, duration, bezier);
	const { composition } = getContext<CompositionContext>(
		compositionContextKey,
	);
	if (composition) composition.add(tween, at);

	onMount(() => {
		if (autoplay) void tween.play(1, Number(autoplay));
	});

	onDestroy(() => {
		composition.remove(tween);
	});
</script>

<slot
	v={$tween}
	{tween}
/>
