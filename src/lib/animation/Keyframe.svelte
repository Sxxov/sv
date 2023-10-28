<script lang="ts">
	import { raise } from '@sxxov/ut/functional';
	import type {
		TrackKeyframe,
		TimeAt,
		TrackKeyframeValue,
	} from '@sxxov/ut/animation';
	import type { ReadableBezier } from '@sxxov/ut/bezier';
	import { onDestroy } from 'svelte';
	import { useLayer } from './useLayer';

	type V = $$Generic<TrackKeyframeValue>;

	type $$Props =
		| {
				is: typeof is;
		  }
		| {
				value: typeof value;
				at?: typeof at;
				bezier?: typeof bezier;
		  };

	export let is: TrackKeyframe<V> | undefined = undefined;
	export let value: V | undefined = undefined;
	export let bezier: ReadableBezier | undefined = undefined;
	export let at: TimeAt = undefined;

	const keyframe =
		is ??
		({
			x:
				value ??
				raise(
					new Error(
						'Keyframe must be initialized with either `is` or `value` props.',
					),
				),
			at,
			...(bezier && { bezier }),
		} satisfies TrackKeyframe<V>);

	const { layer } = useLayer<V>() ?? {};
	layer?.track.add(keyframe);

	onDestroy(() => {
		layer?.track.remove(keyframe);
	});
</script>
