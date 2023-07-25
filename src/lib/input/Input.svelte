<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';
	import Button from '../button/Button.svelte';
	import Svg from '../svg/Svg.svelte';
	import { ic_clear } from 'maic/two_tone';
	import { ButtonVariants } from '../button/ButtonVariants';
	import { onMount } from 'svelte';

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
	export let id: string | undefined = undefined;
	export let placeholder = '';
	export let value = '';
	export let autocomplete: HTMLInputElement['autocomplete'] = 'off';
	export let type: HTMLInputElement['type'] = 'text';
	export let active = false;
	export let multiline = false;
	export let height: TCss = label ? (multiline ? 'auto' : '112px') : '56px';

	let input: HTMLInputElement | HTMLTextAreaElement | undefined;
	let scrollHeight = 112;

	$: id ??= `input--${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
	$: active ? input?.focus() : input?.blur();
	$: auto = multiline && css(height) === 'auto';

	onMount(() => {
		if (multiline) scrollHeight = input!.scrollHeight;
	});

	const onSynch = () => {
		if (!input) return;

		value = input.value;

		if (auto) {
			input.style.height = '0px';
			scrollHeight = input.scrollHeight;
			input.style.height = '';
		}
	};
</script>

<div
	class="input"
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
		--roundness-input: {multiline
		? 'var(----roundness) 0 var(----roundness) var(----roundness)'
		: 'var(----roundness)'};
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
	<svelte:element
		this={multiline ? 'textarea' : 'input'}
		{id}
		class="target"
		{type}
		placeholder={placeholder || ' '}
		{autocomplete}
		{value}
		{name}
		bind:this={input}
		on:input
		on:input={onSynch}
		on:change
		on:change={onSynch}
		on:focus
		on:focus={() => {
			active = true;
		}}
		on:blur
		on:blur={() => {
			active = false;
		}}
		style="
			--height-input: {auto ? css(scrollHeight) : '100%'};
			--min-height-input: {css(label ? 112 : 56)};
		"
	/>
	<div class="right">
		<slot
			name="right"
			{value}
		>
			<div class="clear">
				<Button
					{...ButtonVariants.Fab.Md}
					{...ButtonVariants.Secondary}
					colourBackground="transparent"
					shadow="----shadow-none"
					on:click={() => {
						if (input) {
							input.value = '';
							input.focus();
						}
					}}><Svg svg={ic_clear} /></Button
				>
			</div>
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
	.input {
		position: relative;

		width: var(--width);
		height: var(--height);

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

		& > .target:-webkit-autofill ~ label,
		& > .target:not(:placeholder-shown) ~ label {
			color: var(--colour-label-valued);
		}

		& > .target {
			display: block;

			width: 100%;
			height: var(--height-input);
			min-height: var(--min-height-input);

			color: var(--colour-text);
			font-size: 1em;
			font-family: var(----font-family-sans);

			--padding-input-y: calc(((56px + 14px) - 1.28em) / 2);

			padding: 0 max(var(----roundness), 28px);
			padding-bottom: var(--padding-input-y);
			padding-top: calc(var(--top-input) + var(--padding-input-y));
			box-sizing: border-box;

			border-radius: var(----roundness);

			background: var(--colour-background);
			border: 0;

			outline: 1px solid var(--colour-background);
			outline-offset: -1px;
			box-shadow: var(----shadow-inner-sm), var(----shadow-sm);

			resize: none;

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
				top: 0;
				left: 0;
				padding-top: var(--top-slot);
				box-sizing: border-box;
				height: 100%;

				pointer-events: none;

				& > :global(*) {
					pointer-events: auto;
				}
			}

			& > .target {
				padding-left: 56px;
			}
		}

		&.right {
			& > .right {
				position: absolute;
				top: 0;
				right: 0;
				padding-top: var(--top-slot);
				box-sizing: border-box;
				height: 100%;

				pointer-events: none;

				& > :global(*) {
					pointer-events: auto;
				}

				& > .clear {
					top: 100%;
					transform: translateY(-100%);
					position: relative;
				}
			}

			& > .target {
				padding-right: 56px;
			}
		}
	}
</style>
