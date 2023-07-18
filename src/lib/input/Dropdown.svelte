<script lang="ts">
	import { onMount } from 'svelte';
	import { dropIn } from '../ut/transition';

	import { ButtonVariants } from '../button/ButtonVariants';
	import Button from '../button/Button.svelte';
	import { css, type TCss } from '@sxxov/ut/css';
	import type { TSvgString } from '@sxxov/ut/types';
	import { ic_expand_less, ic_expand_more, ic_search } from 'maic/two_tone';
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
	export let heightMaxItems: TCss = '192px';
	export let name: string;
	export let label = '';
	export let items: T[] = [];
	export let selectedItemId: string | undefined = undefined;
	export let active = false;

	let value = '';
	let hasMounted = false;

	$: searchedItems = items.filter(
		(item) =>
			item.title.includes(value) ||
			item.terms.some((v) => v.includes(value)),
	);

	$: selectedItem = items.find((item) => item.id === selectedItemId);

	$: if (hasMounted && !active) {
		value = selectedItem?.title ?? '';
		if (document.activeElement instanceof HTMLElement)
			document.activeElement.blur();
	}

	onMount(() => {
		hasMounted = true;
	});
</script>

<div
	class="component"
	class:active
	style="
		--height-input: {css(heightInput)};
	"
	role="combobox"
	aria-haspopup="listbox"
	aria-expanded={active}
	aria-owns="listbox"
	aria-controls="listbox"
	aria-activedescendant={selectedItemId}
	tabindex="0"
	on:focusin={(e) => {
		if (e.target instanceof HTMLInputElement)
			e.target.setSelectionRange(0, e.target.value.length);

		active = true;
	}}
	on:focusout={() => {
		active = false;
	}}
	on:keyup={(e) => {
		if (e.key === 'Escape') {
			active = false;
		} else if (e.key === 'Enter') {
			const id = searchedItems[0]?.id;
			if (id) selectedItemId = id;
			active = false;
		}
	}}
>
	<Input
		{width}
		height={heightInput}
		{name}
		{label}
		placeholder="Search"
		bind:active
		bind:value
		on:submit
	>
		<div
			class="input left"
			slot="left"
		>
			<div class="icon">
				<Svg
					svg={active ? ic_search : selectedItem?.icon ?? ic_search}
					colour="----colour-text-secondary"
				/>
			</div>
		</div>
		<div
			class="input right"
			slot="right"
		>
			<Button
				{...ButtonVariants.Secondary}
				{...ButtonVariants.Fab.Md}
				colourBackground="transparent"
				shadow="----shadow-none"
				on:mousedown={(e) => {
					e.preventDefault();
				}}
				on:click={() => {
					active = !active;
				}}
				><Svg svg={active ? ic_expand_less : ic_expand_more} /></Button
			>
		</div>
	</Input>
	<div
		class="items"
		style="
			--height-items: {css(heightMaxItems)};
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
				>
					<div
						class="default item"
						in:dropIn={{
							delay: i * 100,
						}}
					>
						<Button
							{...ButtonVariants.Secondary}
							shadow="----shadow-none"
							on:mousedown={(e) => {
								e.preventDefault();
							}}
							on:click={() => {
								selectedItemId = item.id;
								active = false;
							}}
							><div
								class="left"
								slot="left"
							>
								<div class="icon">
									<Svg
										svg={item.icon}
										colour="----colour-text-secondary"
									/>
								</div>
							</div>
							<div class="title"><p>{item.title}</p></div></Button
						>
					</div>
				</slot>
			{/each}
		{/if}
	</div>
</div>

<style lang="postcss">
	.component {
		height: var(--height-input);

		& .input.left {
			& > .icon {
				padding-left: 28px;
				padding-bottom: 14px;
			}
		}

		& .input.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			gap: -7px;
		}

		&:not(.active) > .items {
			margin-top: -7px;
			z-index: -1;
		}

		& > .items {
			position: relative;
			top: 0;
			left: 0;
			width: 100%;
			height: auto;
			max-height: var(--height-items);
			margin-top: 7px;
			overflow: auto;

			background: var(----colour-background-secondary);
			border-radius: var(----roundness);
			box-shadow: var(----shadow-inner-sm), var(----shadow-md);

			z-index: 100;

			transition: margin-top 0.3s var(----ease-fast-slow);

			& .default.item {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: 16px;
				/* padding: 16px; */
				cursor: pointer;

				&:hover {
					/* background-color: var(----colour-background-tertiary); */
				}

				& .left {
					display: flex;
					flex-direction: row;
					align-items: center;
					gap: 16px;
				}

				& .title {
					font-size: 16px;
					line-height: 24px;
					font-weight: 500;
					color: var(----colour-text-primary);

					width: 100%;
					text-align: start;

					margin-left: 7px;

					& > p {
						margin: 0;
					}
				}
			}
		}
	}
</style>
