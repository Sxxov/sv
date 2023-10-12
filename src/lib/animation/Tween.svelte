<script lang="ts">
	import { Tween as Tw, type TimelineAt } from '@sxxov/ut/animation';
	import type { ReadableBezier } from '@sxxov/ut/bezier';
	import { onDestroy } from 'svelte';
	import { useComposition } from '.';

	type $$Props = {
		at?: typeof at;
	} & (
		| {
				is: typeof is;
		  }
		| {
				start: typeof start;
				end: typeof end;
				duration: typeof duration;
				bezier?: typeof bezier;
		  }
	);

	export let is: Tw | undefined = undefined;
	export let start: number | undefined = undefined;
	export let end: number | undefined = undefined;
	export let duration: number | undefined = undefined;
	export let bezier: ReadableBezier | undefined = undefined;
	export let at: TimelineAt = undefined;

	export const tween = is ?? new Tw(start!, end!, duration!, bezier);

	const { composition } = useComposition();
	composition?.add(tween, at);

	onDestroy(() => {
		composition?.remove(tween);
		if (!is) tween.destroy();
	});
</script>

<slot
	v={$tween}
	{tween}
/>
