<script lang="ts">
	import { ButtonVariants } from '../button/ButtonVariants';
	import Button from '../button/Button.svelte';
	import { css, type TCss } from '@sxxov/ut/css';
	import type { TSvgString } from '@sxxov/ut/types';
	import {
		ic_clear,
		ic_expand_less,
		ic_expand_more,
		ic_search,
	} from 'maic/two_tone';
	import Svg from '../svg/Svg.svelte';
	import Input from './Input.svelte';

	type T = $$Generic<{
		id: string;
		icon: TSvgString;
		title: string;
		terms: readonly string[];
	}>;

	export let width: TCss = '100%';
	export let heightInput: TCss = '112px';
	export let heightItems: TCss = '192px';
	export let name: string;
	export let label: string;
	export let items: T[] = [];
	export let selectedItemId: string | undefined = undefined;

	let active = false;
	let value = '';

	$: searchedItems = items.filter(
		(item) =>
			item.title.includes(value) ||
			item.terms.some((v) => v.includes(value)),
	);

	$: selectedItem = items.find((item) => item.id === selectedItemId);

	$: if (!active) value = selectedItem?.title ?? '';
</script>

<div
	class="component"
	on:focusin={(e) => {
		if (e.target instanceof HTMLInputElement)
			e.target.setSelectionRange(0, e.target.value.length);

		active = true;
	}}
	on:focusout={() => {
		active = false;
	}}
	on:keyup={(e) => {
		if (e.key === 'Escape') active = false;
		else if (e.key === 'Enter') {
			selectedItemId = searchedItems[0]?.id;
			active = false;
		}

		if (e.target instanceof HTMLElement) e.target.blur();
	}}
>
	<Input
		{width}
		height={heightInput}
		{name}
		{label}
		placeholder="Search"
		bind:value
		on:submit
	>
		<span slot="left">
			<Svg svg={active ? ic_search : selectedItem?.icon ?? ic_search} />
		</span>
		<span slot="right"
			>{#if active}
				<Button
					{...ButtonVariants.FabRegularSecondary}
					on:click={() => (value = '')}><Svg svg={ic_clear} /></Button
				>
			{/if}<Button {...ButtonVariants.FabRegularSecondary}
				><Svg svg={active ? ic_expand_less : ic_expand_more} /></Button
			></span
		>
	</Input>
	<div
		class="items"
		style="
			--height-items: {css(heightItems)};
		"
	>
		{#if active}
			{#each searchedItems as item, i (item.id)}
				<slot
					{item}
					{i}
					select={() => {
						selectedItemId = item.id;
						active = false;
					}}
				/>
			{/each}
		{/if}
	</div>
</div>

<style lang="postcss">
	.component {
		display: flex;
		flex-direction: column;

		& > .items {
			position: absolute;
			top: 100%;
			left: 0;
			width: 100%;
			height: var(--height-items);
			overflow: auto;
		}
	}
</style>
