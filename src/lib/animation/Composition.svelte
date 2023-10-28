<script
	lang="ts"
	context="module"
>
	export const compositionContextKey = Symbol('composition');
</script>

<script lang="ts">
	import {
		Composition as C,
		type CompositionFrame,
		type Timeline,
	} from '@sxxov/ut/animation';
	import { onDestroy, setContext } from 'svelte';
	import type { CompositionContext } from './CompositionContext';

	type V = $$Generic<TimelineSegmentValue>;

	type $$Props =
		| {
				is: typeof is;
		  }
		| {
				timeline?: typeof timeline;
		  };

	export let is: C<V> | undefined = undefined;
	export let timeline: Timeline<V> | undefined = undefined;

	export const composition = is ?? new C(timeline);

	setContext<CompositionContext<V>>(compositionContextKey, {
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
