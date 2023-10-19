<script
	context="module"
	lang="ts"
>
	/** The ID of the gradient inside the SVG <def> used for the ripple effect. */
	const GRADIENT_ID = 'ripple--gradient';

	/**
	 * The number of instances of this component currently mounted. Used to
	 * determine if the <defs> should be mounted.
	 */
	let instanceCount = new Store(0);
</script>

<script lang="ts">
	/**
	 * A surface that generates ripples when a `mousedown` or `touchdown` event
	 * is received.
	 */

	import { Composition, Timeline, Tween } from '@sxxov/ut/animation';
	import { bezierExpoOut } from '@sxxov/ut/bezier/beziers';
	import { css, type Css } from '@sxxov/ut/css';

	import { clamp } from '@sxxov/ut/math';
	import { Store } from '@sxxov/ut/store';
	import { resolvePointerFromEvent, type Point } from '@sxxov/ut/viewport';
	import { onDestroy, onMount } from 'svelte';
	import Rr from '../functional/Rr.svelte';
	import { whenResize } from '../ut/action/actions/whenResize';

	/** The width of the ripple surface. */
	export let width: Css = '100%';
	/** The height of the ripple surface. */
	export let height: Css = '100%';
	/** The minimum size of each ripple. */
	export let sizeMin = 560;
	/** The maximum size of each ripple. */
	export let sizeMax = Infinity;
	/** The minimum opacity of each ripple. */
	export let opacityIn = 0.2;
	/** The maximum opacity of each ripple. */
	export let opacityOut = 0;
	/** The minimum duration of each ripple. */
	export let durationMin = 0;
	/** The maximum duration of each ripple. */
	export let durationMax = 3000;

	/** The index of the current instance of this component. */
	let instanceIndex = 0;
	/** Backing data for each ripple. */
	let rippleData: {
		point: Point;
		tweenSize: Tween;
		tweenOpacity: Tween;
	}[] = [];
	/** Height of the ripple surface */
	let svgWidth = 0;
	/** Width of the ripple surface */
	let svgHeight = 0;

	/**
	 * The size of each ripple. This is calculated as the hypotenuse of the
	 * ripple surface.
	 */
	$: size = clamp(
		Math.hypot(svgWidth / 2, svgHeight / 2) * 800,
		sizeMin,
		sizeMax,
	);
	/**
	 * The duration of each ripple. This is calculated depending on the size of
	 * the ripple, so that they seem consistent in speed.
	 */
	$: duration = clamp(size / 2, durationMin, durationMax);

	onMount(() => {
		instanceIndex = $instanceCount;
		++$instanceCount;
	});

	onDestroy(() => {
		--$instanceCount;
	});

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
	const onDown = async (event: MouseEvent | TouchEvent) => {
		if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent)
			isTouching = true;

		/** The position of the cursor/touch relative to the ripple surface. */
		const { x: eventX, y: eventY } = resolvePointerFromEvent(event);
		/** The position of the ripple surface relative to the document. */
		const { x: elemX, y: elemY } = (
			event.currentTarget as HTMLElement
		).getBoundingClientRect();
		/** The position of the ripple relative to the ripple surface. */
		const [rippleX, rippleY] = [eventX - elemX, eventY - elemY];

		// If the event is a mouse event & the user is touching the screen, it
		// means it's a virtual event & should be ignored.
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
		const composition = new Composition()
			.add(tweenSize, { time: 0 })
			.add(tweenOpacity, { time: 0 });

		const rippleDatum = {
			point: {
				x: rippleX,
				y: rippleY,
			},
			tweenSize,
			tweenOpacity,
		};

		// Add the ripple to the list of ripples.
		rippleData.push(rippleDatum);
		rippleData = rippleData;

		composition.seekToProgress(0);
		await composition.play();

		// Remove the ripple from the list of ripples.
		rippleData.splice(rippleData.indexOf(rippleDatum), 1);
		rippleData = rippleData;
	};

	const onUp = (event: MouseEvent | TouchEvent) => {
		// If the event is a mouse event & the user is touching the screen, it
		// means it's a virtual event & should be ignored.
		if (typeof TouchEvent !== 'undefined' && event instanceof TouchEvent)
			isTouching = false;
	};
</script>

<svg
	class="ripple"
	style="
		--width: {css(width)};
		--height: {css(height)};
	"
	on:touchstart|passive={onDown}
	on:mousedown={onDown}
	on:touchend={onUp}
	on:mouseup={onUp}
	use:whenResize={({ width, height }) => {
		// Propagate the size of the ripple surface.
		svgWidth = width;
		svgHeight = height;
	}}
	role="none"
>
	<!--
		We only need to define the gradient once, so we only do it
		if this is the first instance of the component mounted.
	-->
	{#if instanceIndex === $instanceCount - 1}
		<defs>
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
	<!--
		Loop through the ripple back data and render the ripples.

		Use a keyed each loop so ripples that already finished their
		animation are removed from the DOM without affecting the others.
	-->
	{#each rippleData as { point: { x, y }, tweenSize, tweenOpacity }, i (i)}
		<!-- Expose the store data as slot variables using <Rr> -->
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
	.ripple {
		width: 100%;
		height: 100%;

		mix-blend-mode: overlay;
	}
</style>
