<script lang="ts">
	import { css, type Css } from '@sxxov/ut/css';
	import { ic_add, ic_clear, ic_remove } from 'maic/two_tone';
	import { onMount } from 'svelte';
	import Button from '../button/Button.svelte';
	import { ButtonVariants } from '../button/ButtonVariants';
	import Svg from '../svg/Svg.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	type T = $$Generic<HTMLInputAttributes['type']>;
	type V = T extends 'number' ? number : string;
	interface Props {
		colourBackground?: Css;
		colourBackgroundHover?: Css;
		colourBackgroundFocus?: Css;
		colourText?: Css;
		colourTextHover?: Css;
		colourTextFocus?: Css;
		colourLabel?: Css;
		colourLabelValued?: Css;
		shadow?: Css;
		shadowHover?: Css;
		shadowFocus?: Css;
		name: string;
		label?: string;
		width?: Css;
		id?: string;
		placeholder?: string;
		type?: T;
		value?: V;
		step?: string;
		active?: boolean;
		multiline?: boolean;
		height?: Css;
	}
	type Prop<K extends keyof Props> = {
		[P in keyof Props]-?: Props[P];
	}[K];
	type $$Props = Props & Omit<HTMLInputAttributes, keyof Props>;

	export let colourBackground: Prop<'colourBackground'> =
		'----colour-background-secondary';
	export let colourBackgroundHover: Prop<'colourBackgroundHover'> =
		'----colour-background-tertiary';
	export let colourBackgroundFocus: Prop<'colourBackgroundFocus'> =
		'----colour-background-primary';
	export let colourText: Prop<'colourText'> = '----colour-text-primary';
	export let colourTextHover: Prop<'colourTextHover'> =
		'----colour-text-primary';
	export let colourTextFocus: Prop<'colourTextFocus'> =
		'----colour-text-primary';
	export let colourLabel: Prop<'colourLabel'> = '----colour-text-primary';
	export let colourLabelValued: Prop<'colourLabelValued'> =
		'----colour-accent-primary';
	export let shadow: Prop<'shadow'> =
		'var(----shadow-inner-sm), var(----shadow-sm)';
	export let shadowHover: Prop<'shadowHover'> = shadow;
	export let shadowFocus: Prop<'shadowFocus'> =
		'var(----shadow-inner-sm), var(----shadow-md)';
	export let name: Prop<'name'>;
	export let label: Prop<'label'> = '';
	export let width: Prop<'width'> = '100%';
	export let id: Prop<'id'> | undefined = undefined;
	export let placeholder: Prop<'placeholder'> = '';
	export let type: Prop<'type'> = 'text' as Prop<'type'>;
	export let value: Prop<'value'> = (
		type === 'number' ? 0 : ''
	) as Prop<'value'>;
	export let step: Prop<'step'> = '1';
	export let active: Prop<'active'> = false;
	export let multiline: Prop<'multiline'> = false;
	export let height: Prop<'height'> = label
		? multiline
			? 'auto'
			: '112px'
		: '56px';

	let input: HTMLInputElement | HTMLTextAreaElement | undefined;
	let scrollHeight = 112;

	$: id ??= `input--${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
	$: active ? input?.focus() : input?.blur();
	$: number = type === 'number';

	onMount(() => {
		if (multiline) scrollHeight = input!.scrollHeight;
	});

	const asV = (v: string | number): V =>
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
		(number ? Number(v) : String(v)) as V;

	const onSynch = () => {
		if (!input) return;

		value = asV(input.value);

		if (multiline) {
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
		--colour-text: {css(colourText)};
		--colour-text-hover: {css(colourTextHover)};
		--colour-text-focus: {css(colourTextFocus)};
		--colour-label: {css(colourLabel)};
		--colour-label-valued: {css(colourLabelValued)};
		--shadow: {css(shadow)};
		--shadow-hover: {css(shadowHover)};
		--shadow-focus: {css(shadowFocus)};
		--top-input: {css(label ? 42 : 0)};
		--top-slot: {css(label ? 56 : 0)};
		--roundness-input: {multiline
		? 'var(----roundness) 0 var(----roundness) var(----roundness)'
		: 'var(----roundness)'};
	"
	class:left={$$slots.left || number}
	class:right={$$slots.right || true}
	class:number
>
	<div class="left aux">
		<slot
			name="left"
			{value}
		>
			{#if number}
				<div class="de crement">
					<Button
						{...ButtonVariants.Fab.Md}
						{...ButtonVariants.Transparent}
						colourBackground="transparent"
						tabindex={-1}
						width={35}
						height={35}
						padding={0}
						roundness="calc(var(----roundness) - 7px)"
						on:click={() => {
							if (input) {
								value = asV(
									(Number(value) - Number(step)).toFixed(15),
								);
							}
						}}
						><Svg
							width={24}
							svg={ic_remove}
						/></Button
					>
				</div>
			{/if}
		</slot>
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<svelte:element
		this={multiline ? 'textarea' : 'input'}
		{...$$restProps}
		{id}
		class="target"
		class:textarea={multiline}
		class:input={!multiline}
		{type}
		placeholder={placeholder || ' '}
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
		on:keydown
		on:keyup
		on:keypress
		style="
			--height-input: {multiline ? css(scrollHeight) : '100%'};
		"
	/>
	<div class="right aux">
		<slot
			name="right"
			{value}
		>
			{#if number}
				<div class="in crement">
					<Button
						{...ButtonVariants.Fab.Md}
						{...ButtonVariants.Transparent}
						colourBackground="transparent"
						tabindex={-1}
						width={42}
						height={42}
						padding={0}
						on:click={() => {
							if (input) {
								value = asV(
									(Number(value) + Number(step)).toFixed(15),
								);
							}
						}}><Svg svg={ic_add} /></Button
					>
				</div>
			{:else}
				<div class="clear">
					<Button
						{...ButtonVariants.Fab.Md}
						{...ButtonVariants.Transparent}
						colourBackground="transparent"
						tabindex={-1}
						on:click={() => {
							if (input) {
								input.value = '';
								input.focus();
							}
						}}><Svg svg={ic_clear} /></Button
					>
				</div>
			{/if}
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

		display: flex;
		flex-direction: column;

		width: var(--width);
		height: var(--height);
		min-height: inherit;
		max-height: inherit;

		--margin-label: calc(max(var(----roundness), 28px) - 17.5px);
		--padding-input-y: calc(var(--margin-label) + 1.28em / 2);

		& > label {
			position: absolute;

			display: flex;
			align-items: center;
			justify-content: center;
			gap: 7px;

			top: var(--margin-label);
			left: var(--margin-label);

			color: var(--colour-label);
			font-size: 1em;
			font-family: var(----font-family-sans);

			transition: color 0.2s var(----ease-fast-slow);

			background: var(--colour-background);
			padding: 10.5px 17.5px;
			border-radius: var(----roundness);

			box-shadow: var(----shadow-inner-sm);

			z-index: 2;
		}

		& > .target:-webkit-autofill ~ label,
		& > .target:not(:placeholder-shown) ~ label {
			color: var(--colour-label-valued);
		}

		& > .target {
			display: block;

			width: 100%;
			height: var(--height-input);
			min-height: 100%;
			max-height: 100%;

			flex-grow: 1;

			color: var(--colour-text);
			font-size: 1em;
			font-family: var(----font-family-sans);
			text-align: inherit;

			padding: 0 max(var(----roundness), 28px);
			padding-top: calc(var(--top-input) + var(--margin-label) + 10.5px);
			padding-bottom: calc(var(--margin-label) + 10.5px);
			box-sizing: border-box;

			border-radius: var(----roundness);
			border-top-left-radius: calc(
				var(----roundness) + var(--margin-label)
			);

			background: var(--colour-background);
			border: 0;

			outline: 1px solid var(--colour-background);
			outline-offset: -1px;
			box-shadow: var(--shadow);

			resize: none;

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

			&.input[type='number'] {
				-moz-appearance: textfield;

				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					display: none;
				}
			}
		}

		& > .aux {
			position: absolute;
			top: 0;
			padding-top: var(--top-slot);
			box-sizing: border-box;
			height: 100%;

			z-index: 1;

			pointer-events: none;

			&.left {
				left: 0;
			}

			&.right {
				right: 0;
			}

			& > .clear {
				top: 100%;
				transform: translateY(-100%);
				position: relative;
			}

			& > .crement {
				padding: 10.5px;
				padding-top: 3.5px;
			}

			& > :global(*) {
				pointer-events: auto;
			}
		}

		&.left {
			& > .target {
				padding-left: 56px;
			}
		}

		&.right {
			& > .target {
				padding-right: 56px;
			}
		}
	}
</style>
