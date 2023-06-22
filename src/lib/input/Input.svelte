<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';
	import Button from '../button/Button.svelte';
	import Svg from '../svg/Svg.svelte';
	import { ic_clear } from 'maic/two_tone';
	import { ButtonVariants } from '../button/ButtonVariants';

	export let colourBackground: TCss = '----colour-background-secondary';
	export let colourBackgroundHover: TCss = '----colour-background-tertiary';
	export let colourBackgroundFocus: TCss = '----colour-background-primary';
	export let colourBackgroundDisabled: TCss = colourBackground;
	export let colourText: TCss = '----colour-text-primary';
	export let colourTextHover: TCss = '----colour-text-primary';
	export let colourTextFocus: TCss = '----colour-text-primary';
	export let colourTextDisabled: TCss = '----colour-text-disabled';
	export let colourLabel: TCss = '----colour-text-primary';
	export let colourLabelValued: TCss = '----colour-accent-primary';
	export let colourLabelDisabled: TCss = '----colour-text-disabled';
	export let name: string;
	export let label = '';
	export let width: TCss = '100%';
	export let height: TCss = label ? '112px' : '56px';
	export let id: string | undefined = undefined;
	export let placeholder = '';
	export let value = '';
	export let autocomplete: HTMLInputElement['autocomplete'] = 'off';
	export let type: HTMLInputElement['type'] = 'text';
	export let active = false;

	let input: HTMLInputElement | undefined;

	$: id ??= `input--${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
	$: active ? input?.focus() : input?.blur();
</script>

<div
	class="component"
	style="
		--height: {css(height)};
		--width: {css(width)};
		--colour-background: {css(colourBackground)};
		--colour-background-hover: {css(colourBackgroundHover)};
		--colour-background-focus: {css(colourBackgroundFocus)};
		--colour-background-disabled: {css(colourBackgroundDisabled)};
		--colour-text: {css(colourText)};
		--colour-text-hover: {css(colourTextHover)};
		--colour-text-focus: {css(colourTextFocus)};
		--colour-text-disabled: {css(colourTextDisabled)};
		--colour-label: {css(colourLabel)};
		--colour-label-valued: {css(colourLabelValued)};
		--colour-label-disabled: {css(colourLabelDisabled)};
		--top-input: {css(label ? 42 : 0)};
		--top-slot: {css(label ? 56 : 0)};
	"
	class:left={$$slots.left}
	class:right={$$slots.right || true}
>
	<div class="left">
		<slot
			name="left"
			{value}
		/>
	</div>
	<input
		{id}
		{type}
		placeholder={placeholder || ' '}
		{autocomplete}
		{value}
		{name}
		bind:this={input}
		on:input
		on:input={(e) => {
			value = e.currentTarget.value;
		}}
		on:change
		on:change={(e) => {
			value = e.currentTarget.value;
		}}
		on:focus
		on:focus={(e) => {
			active = true;
		}}
		on:blur
		on:blur={() => {
			active = false;
		}}
	/>
	<div class="right">
		<slot
			name="right"
			{value}
		>
			<Button
				{...ButtonVariants.FabRegularSecondary}
				colourBackground="transparent"
				shadow="----shadow-none"
				on:click={() => {
					if (input) {
						input.value = '';
						input.focus();
					}
				}}><Svg svg={ic_clear} /></Button
			>
		</slot>
	</div>
	{#if label || $$slots['label-left'] || $$slots['label-right']}
		<label for={id}>
			<slot
				name="label-left"
				{value}
			/>{label}<slot
				name="label-right"
				{value}
			/>
		</label>
	{/if}
</div>

<style lang="postcss">
	.component {
		position: relative;

		width: var(--width);

		& > label {
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

			background: var(--colour-background);
			padding: 10.5px 17.5px;
			border-radius: var(----roundness);

			box-shadow: var(----shadow-inner-sm);
		}

		& > input:-webkit-autofill ~ label,
		& > input:not(:placeholder-shown) ~ label {
			color: var(--colour-label-valued);
		}

		& > input {
			display: block;

			width: 100%;
			height: var(--height);

			color: var(--colour-text);
			font-size: 1em;
			font-family: var(----font-family-sans);

			padding: 0 max(var(----roundness), 7px);
			padding-top: var(--top-input);
			box-sizing: border-box;

			border-radius: var(----roundness);

			background: var(--colour-background);
			border: 0;

			outline: 1px solid var(--colour-background);
			outline-offset: -1px;
			box-shadow: var(----shadow-inner-sm), var(----shadow-sm);

			--transition: background 0.2s var(----ease-fast-slow),
				outline 0.3s var(----ease-slow-slow),
				box-shadow 0.3s var(----ease-fast-slow),
				transform 0.3s var(----ease-fast-slow);

			transition: var(--transition);

			&:hover {
				background: var(--colour-background-hover);
				outline: 1px solid var(--colour-background-hover);
			}

			&:focus {
				outline: 0;

				background: var(--colour-background-focus);
				box-shadow: var(----shadow-inner-sm), var(----shadow-md);
				outline: 1px solid var(--colour-background-focus);
			}

			&:active {
				transition: var(--transition), outline 0s;
				outline: 1px solid var(----colour-text-tertiary);
			}
		}

		&.left {
			& > .left {
				position: absolute;
				top: calc(var(--top-slot) + 28px);
				left: 0;
				transform: translateY(-50%);
			}

			& > input {
				padding-left: 56px;
			}
		}

		&.right {
			& > .right {
				position: absolute;
				top: calc(var(--top-slot) + 28px);
				right: 0;
				transform: translateY(-50%);
			}

			& > input {
				padding-right: 56px;
			}
		}
	}
</style>
