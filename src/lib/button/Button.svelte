<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';
	import Ripple from './Ripple.svelte';
	import Spacer from '../layout/Spacer.svelte';
	import { onMount } from 'svelte';
	import LineLoader from '../loaders/LineLoader.svelte';

	export let colourBackground: TCss = '----colour-background-secondary';
	export let colourBackgroundHover: TCss = '----colour-background-tertiary';
	export let colourBackgroundActive: TCss = colourBackgroundHover;
	export let colourBackgroundDisabled: TCss = colourBackground;
	export let colourText: TCss = '----colour-text-primary';
	export let colourTextHover: TCss = colourText;
	export let colourTextActive: TCss = colourText;
	export let colourTextDisabled: TCss = '----colour-text-secondary';
	export let width: TCss = 'max-content';
	export let height: TCss = 56;
	export let roundness: TCss = '----roundness';
	export let shadow: TCss = '----shadow-md';
	export let disabled = false;
	export let padding: TCss = '16px max(var(--roundness), 24px)';
	export let type: 'button' | 'submit' | 'reset' = 'button';

	let hasMounted = false;

	onMount(() => {
		hasMounted = true;
	});
</script>

<button
	{disabled}
	{type}
	style="
		--width: {css(width)};
		--height: {css(height)};
		--roundness: {css(roundness)};
		--shadow: {css(shadow)};
		--colour-background: {css(colourBackground)};
		--colour-background-hover: {css(colourBackgroundHover)};
		--colour-background-active: {css(colourBackgroundActive)};
		--colour-background-disabled: {css(colourBackgroundDisabled)};
		--colour-text: {css(colourText)};
		--colour-text-hover: {css(colourTextHover)};
		--colour-text-active: {css(colourTextActive)};
		--colour-text-disabled: {css(colourTextDisabled)};
		--padding: {css(padding)};
	"
	class:left={$$slots.left}
	class:right={$$slots.right}
	on:click
>
	<slot name="background">
		<div class="default background" />
	</slot>

	{#if hasMounted}
		<slot name="content">
			<div class="default content">
				<slot name="left" /><slot /><slot name="right"
					>{#if $$slots.left}<Spacer
							width={24}
							height={16}
						/>{/if}</slot
				>
			</div>
		</slot>
	{:else}
		<slot name="loader">
			<div class="default loader">
				<LineLoader />
			</div>
		</slot>
	{/if}

	<div class="ripple">
		<Ripple />
	</div>
</button>

<style lang="postcss">
	button {
		position: relative;

		height: var(--height);
		width: var(--width);

		background: transparent;
		border: none;

		transform: matrix(1, 0, 0, 1, 0, 0);
		padding: var(--padding);
		box-sizing: border-box;

		cursor: pointer;

		border-radius: var(--roundness);
		color: var(--colour-text);

		& > .ripple {
			position: absolute;
			top: 0;
			left: 0;

			height: 100%;
			width: 100%;

			z-index: 1;

			border-radius: var(--roundness);

			overflow: hidden;
			overflow: clip;
		}

		& > .default.content {
			position: relative;
			z-index: 1;
			width: 100%;
			height: 100%;

			display: flex;
			align-items: center;
			justify-content: space-between;

			text-align: center;

			user-select: none;
		}

		&:not(.left):not(.right) > .default.content {
			justify-content: center;
		}

		& > .default.background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			border-radius: var(--roundness);

			background: var(--colour-background);
			box-shadow: var(----shadow-inner-sm), var(--shadow);

			outline: solid 1px var(--colour-background);
			outline-offset: -1px;

			--transition: background 0.2s var(----ease-fast-slow),
				outline 0.3s var(----ease-slow-slow),
				box-shadow 0.3s var(----ease-fast-slow),
				transform 0.3s var(----ease-fast-slow);

			transition: var(--transition);
		}

		& > .default.loader {
			position: relative;
			z-index: 1;
			width: 100%;
			height: 100%;

			display: flex;
			align-items: center;
			justify-content: center;

			text-align: center;

			user-select: none;
		}

		/*
			replaces \`@media (hover: none)\`
			https://www.ctrl.blog/entry/css-media-hover-samsung.html
		*/
		@media (pointer: fine) {
			&:hover {
				color: var(--colour-text-hover);

				& > .default.background {
					background: var(--colour-background-hover);
					outline: solid 1px var(--colour-background-hover);
					box-shadow: var(----shadow-inner-sm), var(--shadow);
				}
			}
		}

		&:active {
			color: var(--colour-text-active);

			& > .default.background {
				background: var(--colour-background-active);

				transition: var(--transition), outline 0s;
				outline: solid 1px var(----colour-text-tertiary);
				box-shadow: var(----shadow-inner-md), var(----shadow-none);
			}
		}

		&:disabled {
			color: var(--colour-text-disabled);
			cursor: not-allowed;

			& > .default.background {
				background: var(--colour-background-disabled);
				outline: solid 1px var(--colour-background-disabled);
				box-shadow: var(----shadow-inner-sm), var(----shadow-md);
			}
		}
	}
</style>
