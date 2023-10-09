<script
	lang="ts"
	context="module"
>
	export const compositionContextKey = Symbol('composition');
</script>

<script lang="ts">
	import { Composition, type Timeline } from '@sxxov/ut/animation';
	import { setContext } from 'svelte';
	import type { CompositionContext } from './CompositionContext';

	export let timeline: Timeline | undefined = undefined;

	const composition = new Composition(timeline);

	setContext<CompositionContext>(compositionContextKey, { composition });
</script>

<slot {composition} />
