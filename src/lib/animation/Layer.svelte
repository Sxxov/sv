<script
	lang="ts"
	context="module"
>
	export const layerContextKey = Symbol('layer');
</script>

<script lang="ts">
	import {
		Layer as L,
		type TimelineAt,
		type Track,
		type TrackKeyframeValue,
	} from '@sxxov/ut/animation';
	import { onDestroy } from 'svelte';
	import { useComposition } from './useComposition';
	import { raise } from '@sxxov/ut/functional';
	import { IllegalArgumentError } from '@sxxov/ut/errors';

	type V = $$Generic<TrackKeyframeValue>;

	type $$Props = {
		at?: typeof at;
	} & (
		| {
				is: typeof is;
		  }
		| (
				| {
						initial: typeof initial;
				  }
				| {
						track: typeof track;
				  }
		  )
	);

	export let is: L<V> | undefined = undefined;
	export let initial: V | undefined = undefined;
	export let track: Track<V> | undefined = undefined;
	export let at: TimelineAt = undefined;

	export const layer =
		is ?? initial
			? new L(initial)
			: track
			? new L(track)
			: raise(
					new IllegalArgumentError(
						'Layer must be initialized with either `is`, `initial` or `track` props.',
					),
			  );

	const { composition } = useComposition<V>() ?? {};
	composition?.add(layer, at);

	onDestroy(() => {
		composition?.remove(layer);
		if (!is) layer.destroy();
	});
</script>

<slot
	v={$layer}
	{layer}
/>
