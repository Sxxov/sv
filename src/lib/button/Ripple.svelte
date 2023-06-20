<script context="module">
	const GRADIENT_ID = 'ripple--gradient';
</script>

<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';
	import { Composition, Tween } from '@sxxov/ut/animation';
	import { bezierExpoOut } from '@sxxov/ut/bezier/beziers';

	import { singleton } from '../common/singleton';
	import { clamp } from '@sxxov/ut/math';
	import { resolveEventClientPoint, type IPoint } from '@sxxov/ut/viewport';
	import { whenResize } from '../ut/use/whenResize';
	import Rr from '../functional/Rr.svelte';

	const {
		mount: acquireLockRippleGradient,
		shouldMount: shouldMountRippleGradient,
	} = singleton(GRADIENT_ID);

	$: console.log($shouldMountRippleGradient);

	export let width: TCss = '100%';
	export let height: TCss = '100%';
	export let sizeMin = 560;
	export let sizeMax = Infinity;
	export let opacityIn = 0.2;
	export let opacityOut = 0;
	export let durationMin = 0;
	export let durationMax = 3000;

	let rippleData: {
		point: IPoint;
		tweenSize: Tween;
		tweenOpacity: Tween;
	}[] = [];
	let svgWidth = 0;
	let svgHeight = 0;

	$: console.log({ svgHeight, svgWidth });

	$: size = clamp(
		Math.hypot(svgWidth / 2, svgHeight / 2) * 800,
		sizeMin,
		sizeMax,
	);
	$: duration = clamp(size / 2, durationMin, durationMax);

	// browsers on touch screens emit a mousedown & mouseup event,
	// even on touches...
	//
	// this happens in this sequence:
	// user down
	// → touchdown (timestamp: x)
	// user up
	// → touchup (timestamp: x + touch duration)
	// → mousedown (timestamp: y)
	// → mouseup (timestamp: y)
	let isTouching = false;
	const onDown = (event: MouseEvent | TouchEvent) => {
		if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent)
			isTouching = true;

		const { x: eventX, y: eventY } = resolveEventClientPoint(event);
		const { x: elemX, y: elemY } = (
			event.currentTarget as HTMLElement
		).getBoundingClientRect();
		const [rippleX, rippleY] = [eventX - elemX, eventY - elemY];

		if (
			typeof MouseEvent !== 'undefined' &&
			event instanceof MouseEvent &&
			isTouching
		)
			return;

		const tweenSize = new Tween(20, size, duration);
		const tweenOpacity = new Tween(
			opacityIn,
			opacityOut,
			duration,
			bezierExpoOut,
		);
		const rippleDatum = {
			point: {
				x: rippleX,
				y: rippleY,
			},
			tweenSize,
			tweenOpacity,
		};
		void new Composition([
			{
				tween: tweenSize,
				delay: 0,
			},
			{
				tween: tweenOpacity,
				delay: 0,
			},
		])
			.play()
			.then(() => {
				rippleData.splice(rippleData.indexOf(rippleDatum), 1);
				rippleData = rippleData;
			});

		rippleData.push(rippleDatum);
		rippleData = rippleData;
	};

	const onUp = (event: MouseEvent | TouchEvent) => {
		if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent)
			isTouching = false;
	};
</script>

<svg
	class="component"
	style="
		--width: {css(width)};
		--height: {css(height)};
	"
	on:touchstart|passive={onDown}
	on:mousedown={onDown}
	on:touchend={onUp}
	on:mouseup={onUp}
	use:whenResize={({ width, height }) => {
		svgWidth = width;
		svgHeight = height;
	}}
>
	{#if $shouldMountRippleGradient}
		<defs use:acquireLockRippleGradient>
			<radialGradient id={GRADIENT_ID}>
				<stop
					offset="0%"
					stop-color="var(----colour-text-transparent)"
				/>
				<stop
					offset="40%"
					stop-color="var(----colour-text-secondary)"
				/>
				<stop
					offset="80%"
					stop-color="var(----colour-text-secondary)"
				/>
				<stop
					offset="100%"
					stop-color="var(----colour-text-transparent)"
				/>
			</radialGradient>
		</defs>
	{/if}
	{#each rippleData as { point: { x, y }, tweenSize, tweenOpacity }, i (i)}
		<Rr
			rr={{
				tweenSize,
				tweenOpacity,
			}}
			let:v={{ tweenSize, tweenOpacity }}
		>
			<circle
				fill="url(#{GRADIENT_ID})"
				cx={x}
				cy={y}
				r={tweenSize / 20}
				opacity={tweenOpacity}
			/>
		</Rr>
	{/each}
</svg>

<style lang="postcss">
	svg {
		width: 100%;
		height: 100%;

		mix-blend-mode: overlay;
	}
</style>
