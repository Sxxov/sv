<script lang="ts">
	import { Tween, type TimelineAt } from '@sxxov/ut/animation';
	import type { ReadableBezier } from '@sxxov/ut/bezier';
	import { onDestroy } from 'svelte';
	import { useComposition } from '.';

	export let start: number;
	export let end: number;
	export let duration: number;
	export let bezier: ReadableBezier | undefined = undefined;
	export let at: TimelineAt = undefined;

	const tween = new Tween(start, end, duration, bezier);
	const { composition } = useComposition();
	if (composition) composition.add(tween, at);

	onDestroy(() => {
		composition.remove(tween);
	});
</script>

<slot
	v={$tween}
	{tween}
/>
