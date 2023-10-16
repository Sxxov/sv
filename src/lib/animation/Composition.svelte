<script
	lang="ts"
	context="module"
>
	export const compositionContextKey = Symbol('composition');
</script>

<script lang="ts">
	import { Composition as C, type Timeline } from '@sxxov/ut/animation';
	import { onDestroy, setContext } from 'svelte';
	import type { CompositionContext } from './CompositionContext';

	type $$Props =
		| {
				is: typeof is;
		  }
		| {
				timeline?: typeof timeline;
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
