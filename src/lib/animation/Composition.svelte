<script
	lang="ts"
	context="module"
>
	export const compositionContextKey = Symbol('composition');
</script>

<script lang="ts">
	import {
		type AnimatableIterationCount,
		Composition,
		type Timeline,
	} from '@sxxov/ut/animation';
	import { onMount, setContext } from 'svelte';
	import type { CompositionContext } from './CompositionContext';

	export let timeline: Timeline | undefined = undefined;
	// eslint-disable-next-line @typescript-eslint/ban-types
	export let autoplay: boolean | AnimatableIterationCount | (number & {}) = 0;

	const composition = new Composition(timeline);

	setContext<CompositionContext>(compositionContextKey, { composition });

	onMount(() => {
		if (autoplay) void composition.play(1, Number(autoplay));
	});
</script>

<slot {composition} />
