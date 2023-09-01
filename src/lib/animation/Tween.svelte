<script lang="ts">
	import { Tween } from '@sxxov/ut/animation';
	import type { Composition } from '@sxxov/ut/animation';
	import type { ReadableBezier } from '@sxxov/ut/bezier';

	export let composition: Composition;
	export let start: number;
	export let end: number;
	export let duration: number;
	export let bezier: ReadableBezier | undefined = undefined;
	export let delay = 0;

	let tween: Tween;

	$: {
		if (tween) composition.delete(tween);
		tween = new Tween(start, end, duration, bezier);
		composition.add(tween, delay);
	}
</script>

<slot v={$tween} />
