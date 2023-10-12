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
	import { Composition, type Timeline } from '@sxxov/ut/animation';
	import { getContext, onDestroy, setContext } from 'svelte';
	import type { CompositionContext } from './CompositionContext';

	export let timeline: Timeline | undefined = undefined;

	const composition = new Composition(timeline);

	setContext<CompositionContext>(compositionContextKey, { composition });

	onDestroy(() => {
		composition.destroy();
	});
</script>

<slot
	v={$composition}
	{composition}
/>
