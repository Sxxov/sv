<script lang="ts">
	import { onMount, type ComponentProps } from 'svelte';
	import { dropIn } from '../ut/transition';

	import { ButtonVariants } from '../button/ButtonVariants';
	import Button from '../button/Button.svelte';
	import { css, type TCss } from '@sxxov/ut/css';
	import type { TSvgString } from '@sxxov/ut/types';
	import { ic_expand_less, ic_expand_more, ic_search } from 'maic/two_tone';
	import Svg from '../svg/Svg.svelte';
	import Input from './Input.svelte';
	import { mod } from '@sxxov/ut/math';

	interface IItem {
		id: string;
		icon: TSvgString;
		title: string;
		terms: readonly string[];
	}

	export let width: TCss = '100%';
	export let label = '';
	export let heightInput: TCss = label ? '112px' : '56px';
	export let heightMaxItems: TCss = '192px';
	export let name: string;
	export let items: [IItem, ...IItem[]];
	export let selectedItemId = items[0].id;
	export let active = false;
	export let inputProps: Partial<ComponentProps<Input>> = {};

	let value = '';
	let hasMounted = false;

	const selectUp = () => {
		const index = searchedItems.findIndex(
			(item) => item.id === selectedItemId,
		);
		const item = searchedItems[mod(index + 1, searchedItems.length)];

		if (item) selectedItemId = item.id;
	};

	const selectDown = () => {
		const index = searchedItems.findIndex(
			(item) => item.id === selectedItemId,
		);
		const item = searchedItems[mod(index - 1, searchedItems.length)];

		if (item) selectedItemId = item.id;
	};

	$: searchedItems = items.filter(
		(item) =>
			item.title.toLowerCase().includes(value.toLowerCase()) ||
			item.terms.some((v) =>
				v.toLowerCase().includes(value.toLowerCase()),
			),
	);

	$: selectedItem = items.find((item) => item.id === selectedItemId);

	const selectFirstIfNone = () => {
		if (
			searchedItems.length > 0 &&
			!searchedItems.some(({ id }) => id === selectedItemId)
		) {
			selectedItem = searchedItems[0]!;
			selectedItemId = selectedItem.id;
		}
	};
	$: if (hasMounted && !active) {
		selectFirstIfNone();
		value = selectedItem?.title ?? '';
		if (document.activeElement instanceof HTMLElement)
			document.activeElement.blur();
	}

	onMount(() => {
		hasMounted = true;
	});
</script>

<div
	class="dropdown"
	class:active
	style="
		--width: {css(width)};
		--height-input: {css(heightInput)};
	"
	role="combobox"
	aria-haspopup="listbox"
	aria-expanded={active}
	aria-owns="listbox"
	aria-controls="listbox"
	aria-activedescendant={selectedItemId}
	tabindex={-1}
	on:focusin={(e) => {
		if (e.target instanceof HTMLInputElement)
			e.target.setSelectionRange(0, e.target.value.length);

		searchedItems = items;
	}}
	on:keydown={(e) => {
		switch (e.key) {
			case 'Escape':
				active = false;
				break;
			case 'Enter':
				active = !active;

				break;
			case 'ArrowDown':
				e.preventDefault();
				selectDown();
				break;
			case 'ArrowUp':
				e.preventDefault();
				selectUp();
				break;
			case 'Tab':
				if (active) {
					e.preventDefault();

					if (e.shiftKey) selectUp();
					else selectDown();
				}

				break;
			default:
		}
	}}
>
	<Input
		width="100%"
		height={heightInput}
		{name}
		{label}
		placeholder="Search"
		{...inputProps}
		bind:active
		bind:value
		on:submit
	>
		<div
			class="input left"
			slot="left"
			style="
				--height-icon: {css(label ? 42 : 56)}
			"
		>
			<div
				class="icon"
				class:option={!active}
			>
				<Svg
					svg={active ? ic_search : selectedItem?.icon ?? ic_search}
					colour={active
						? '----colour-text-secondary'
						: '----colour-text-primary'}
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
				tabindex={-1}
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
							{...item.id === selectedItem?.id
								? ButtonVariants.Primary
								: ButtonVariants.Secondary}
							shadow="----shadow-none"
							tabindex={-1}
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
									<Svg svg={item.icon} />
								</div>
							</div>
							<div class="title">{item.title}</div></Button
						>
					</div>
				</slot>
			{/each}
		{/if}
	</div>
</div>

<style lang="postcss">
	.dropdown {
		width: var(--width);
		height: var(--height-input);

		& .input.left {
			& > .icon {
				display: flex;
				align-items: center;
				justify-content: center;

				width: 56px;
				height: var(--height-icon);
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

					width: 100%;
					text-align: start;

					margin-left: 7px;
				}
			}
		}
	}
</style>
