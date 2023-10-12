<script
	lang="ts"
	context="module"
>
	const compositionContextKey = Symbol('composition');
	export const useComposition = () =>
		getContext<CompositionContext>(compositionContextKey) ?? {
			composition: undefined,
		};
</script>

<script lang="ts">
	import { Composition as C, type Timeline } from '@sxxov/ut/animation';
	import { getContext, onDestroy, setContext } from 'svelte';
	import type { CompositionContext } from './CompositionContext';

	type $$Props =
		| {
				is: typeof is;
		  }
		| {
				timeline: typeof timeline;
		  };

	export let is: C | undefined = undefined;
	export let timeline: Timeline | undefined = undefined;

	export const composition: C = is ?? new C(timeline);

	setContext<CompositionContext>(compositionContextKey, {
		composition,
	});

	onDestroy(() => {
		if (!is) composition.destroy();
	});
</script>

<slot
	v={$composition}
	{composition}
/>
