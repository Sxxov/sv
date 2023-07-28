<script lang="ts">
	import Button from '../button/Button.svelte';
	import { css, type TCss } from '@sxxov/ut/css';
	import Svg from '../svg/Svg.svelte';
	import { ic_check, ic_close } from 'maic/two_tone';

	export let colourBackground: TCss = '----colour-background-secondary';
	export let colourBackgroundHover: TCss = '----colour-background-tertiary';
	export let colourBackgroundFocus: TCss = '----colour-background-primary';
	export let colourText: TCss = '----colour-text-primary';
	export let colourTextHover: TCss = '----colour-text-primary';
	export let colourTextFocus: TCss = '----colour-text-primary';
	export let colourLabel: TCss = '----colour-text-primary';
	export let colourLabelValued: TCss = '----colour-accent-primary';
	export let shadow: TCss = 'var(----shadow-inner-sm), var(----shadow-sm)';
	export let shadowHover: TCss = shadow;
	export let shadowFocus: TCss =
		'var(----shadow-inner-sm), var(----shadow-md)';
	export let name: string;
	export let label: string;
	export let id: string | undefined = undefined;
	export let width: TCss = '100%';
	export let widthTrack: TCss = 56;
	export let widthKnob: TCss = 35;
	export let height: TCss = 112;
	export let heightTrack: TCss = 35;
	export let heightKnob: TCss = 35;
	export let roundness: TCss = '----roundness';
	export let checked = false;

	$: id ??= `toggle--${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
</script>

<label
	class="toggle"
	style="
		--height: {css(height)};
		--width: {css(width)};
		--colour-background: {css(colourBackground)};
		--colour-background-hover: {css(colourBackgroundHover)};
		--colour-background-focus: {css(colourBackgroundFocus)};
		--colour-text: {css(colourText)};
		--colour-text-hover: {css(colourTextHover)};
		--colour-text-focus: {css(colourTextFocus)};
		--colour-label: {css(colourLabel)};
		--colour-label-valued: {css(colourLabelValued)};
		--shadow: {css(shadow)};
		--shadow-hover: {css(shadowHover)};
		--shadow-focus: {css(shadowFocus)};
		--width-track: {css(widthTrack)};
		--width-knob: {css(widthKnob)};
		--height-track: {css(heightTrack)};
		--height-knob: {css(heightKnob)};
		--roundness: {css(roundness)};
	"
	class:left={$$slots.left}
	class:right={$$slots.right}
>
	<slot name="left" />
	<input
		type="checkbox"
		bind:checked
		on:input={() => {
			checked = !checked;
		}}
	/>
	<span class="label"
		><slot name="label-left" />{label}<slot name="label-right" /></span
	>
	<div class="content">
		<div class="track">
			<div class="knob">
				<Button
					height="100%"
					width="100%"
					roundness="calc({css(roundness)} - 2px)"
					padding={0}
					on:click={() => {
						checked = !checked;
					}}
					><Svg
						colour={checked ? colourLabelValued : colourLabel}
						svg={checked ? ic_check : ic_close}
					/></Button
				>
			</div>
		</div>
	</div>
	<slot name="right" />
</label>

<style lang="postcss">
	.toggle {
		display: block;
		position: relative;

		width: var(--width);
		height: var(--height);

		background: var(--colour-background);
		border: 0;

		outline: 1px solid var(--colour-background);
		box-shadow: var(--shadow);
		border-radius: var(----roundness);

		padding-top: 56px;
		padding-left: 28px;
		box-sizing: border-box;

		--transition: background 0.2s var(----ease-fast-slow),
			outline 0.3s var(----ease-slow-slow),
			box-shadow 0.3s var(----ease-fast-slow),
			transform 0.3s var(----ease-fast-slow);

		transition: var(--transition);

		&:hover {
			background: var(--colour-background-hover);
			box-shadow: var(--shadow-hover);
			outline: 1px solid var(--colour-background-hover);
		}

		&:focus {
			outline: 0;

			background: var(--colour-background-focus);
			box-shadow: var(--shadow-focus);
			outline: 1px solid var(--colour-background-focus);
		}

		&:active {
			transition: var(--transition), outline 0s;
			outline: 1px solid var(----colour-text-tertiary);
		}

		& > input {
			display: none;
		}

		& > .label {
			position: absolute;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 7px;

			top: calc(max(var(----roundness), 28px) - 17.5px);
			left: calc(max(var(----roundness), 28px) - 17.5px);

			color: var(--colour-label);
			font-size: 1em;
			font-family: var(----font-family-sans);

			transition: color 0.2s var(----ease-fast-slow);

			background: var(----colour-background-secondary);
			padding: 10.5px 17.5px;
			border-radius: var(----roundness);

			box-shadow: var(----shadow-inner-sm);
		}

		& > .content {
			height: 100%;

			display: flex;
			align-items: center;

			padding-bottom: 7px;
			box-sizing: border-box;

			& > .track {
				display: grid;
				align-items: center;
				/* justify-content: center; */

				width: var(--width-track);
				height: var(--height-track);

				background: var(----colour-background-primary);
				border-radius: var(----roundness);

				transition: background 0.2s var(----ease-slow-slow);

				& > .knob {
					width: var(--width-knob);
					height: var(--height-knob);

					padding: 2px;
					box-sizing: border-box;

					transition: transform 0.2s var(----ease-fast-slow);
				}
			}
		}

		& > input:checked {
			& ~ .label {
				color: var(--colour-label-valued);
			}

			& ~ .content {
				& > .track {
					background: var(--colour-label-valued);

					& > .knob {
						transform: translateX(
							calc(var(--width-track) - var(--width-knob))
						);
					}
				}
			}
		}
	}
</style>
