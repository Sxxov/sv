<script lang="ts">
	import { whenResize } from '../ut/use/whenResize';

	import { css, type TCss } from '@sxxov/ut/css';

	// based on https://github.com/sveltejs/svelte-virtual-list

	import { onMount, tick, onDestroy } from 'svelte';

	type T = $$Generic<Record<any, any>>;

	export let items: T[];
	export let height: TCss = '100%';
	export let itemHeight: number | undefined = undefined;
	export let initialVisibleCount = 0;

	let indexVisibleStart = 0;
	let indexVisibleEnd = initialVisibleCount;

	const itemHeights: number[] = [];
	const rowDivBinds: (HTMLDivElement | null)[] = [];
	let componentDiv: HTMLDivElement | undefined;
	let offsetHeight = 0;
	let isMounted = false;

	let heightGapTop = 0;
	let heightGapBottom = 0;
	let heightAverage: number;

	onMount(() => {
		isMounted = true;
	});

	onDestroy(() => {
		isMounted = false;
	});

	$: itemIndexAndItem = items
		.slice(indexVisibleStart, indexVisibleEnd)
		.map((item, i) => [i + indexVisibleStart, item] as const);

	$: rowDivs = rowDivBinds.filter(Boolean) as HTMLDivElement[];

	$: if (isMounted) {
		items;
		offsetHeight;
		itemHeight;

		void refresh();
	}

	async function refresh() {
		if (!componentDiv) return;

		const { scrollTop } = componentDiv;

		await tick(); // wait until the DOM is up to date

		let contentHeight = heightGapTop - scrollTop;
		let i = indexVisibleStart;

		while (contentHeight < offsetHeight && i < items.length) {
			const visibleIndex = i - indexVisibleStart;

			if (visibleIndex < 0 || visibleIndex >= rowDivs.length) {
				indexVisibleEnd = i + 1;

				await tick(); // render the newly visible row
			}

			const row = rowDivs[visibleIndex]!;
			const rowHeight = itemHeight ?? row.offsetHeight;

			itemHeights[i] = rowHeight;
			contentHeight += rowHeight;
			i += 1;
		}

		indexVisibleEnd = i;

		const remaining = items.length - indexVisibleEnd;
		heightAverage = (heightGapTop + contentHeight) / indexVisibleEnd;

		heightGapBottom = remaining * heightAverage;
		itemHeights.length = items.length;
	}

	async function onScroll() {
		if (!componentDiv) return;

		const { scrollTop } = componentDiv;

		const prevStart = indexVisibleStart;

		for (let i = 0; i < rowDivs.length; ++i)
			itemHeights[indexVisibleStart + i] =
				itemHeight ?? rowDivs[i]!.offsetHeight;

		let i = 0;
		let y = 0;

		while (i < items.length) {
			const rowHeight = itemHeights[i] || heightAverage;

			if (y + rowHeight > scrollTop) {
				indexVisibleStart = i;
				heightGapTop = y;

				break;
			}

			y += rowHeight;
			i += 1;
		}

		while (i < items.length) {
			y += itemHeights[i] || heightAverage;
			i += 1;

			if (y > scrollTop + offsetHeight) break;
		}

		indexVisibleEnd = i;

		const remaining = items.length - indexVisibleEnd;
		heightAverage = y / indexVisibleEnd;

		while (i < items.length) itemHeights[i++] = heightAverage;
		heightGapBottom = remaining * heightAverage;

		// prevent jumping if we scrolled up into unknown territory
		if (indexVisibleStart < prevStart) {
			await tick();

			let expectedHeight = 0;
			let actualHeight = 0;

			for (let i = indexVisibleStart; i < prevStart; i += 1) {
				if (rowDivs[i - indexVisibleStart]) {
					expectedHeight += itemHeights[i]!;
					actualHeight +=
						itemHeight ??
						rowDivs[i - indexVisibleStart]!.offsetHeight;
				}
			}

			const d = actualHeight - expectedHeight;
			componentDiv.scrollTo({
				left: 0,
				top: scrollTop + d,
				behavior: 'smooth',
			});
		}

		// TODO if we overestimated the space these
		// rows would occupy we may need to add some
		// more. maybe we can just call handle_scroll again?
	}
</script>

<div
	class="virtual-list"
	style="--height: {css(height)};"
	bind:this={componentDiv}
	on:scroll={onScroll}
	use:whenResize={({ height }) => {
		offsetHeight = height;
	}}
>
	<div
		class="content"
		style="
			--height-gap-top: {heightGapTop}px;
			--height-gap-bottom: {heightGapBottom}px;
		"
	>
		{#each itemIndexAndItem as [indexItem, item] (indexItem)}
			<div
				class="row"
				bind:this={rowDivBinds[indexItem]}
			>
				<slot
					{item}
					{indexItem}
					{indexVisibleStart}
					{indexVisibleEnd}
					{refresh}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	.virtual-list {
		position: relative;

		height: var(--height);

		overflow-y: auto;
		-webkit-overflow-scrolling: touch;

		& > .content {
			padding-top: var(--height-gap-top);
			padding-bottom: var(--height-gap-bottom);

			& > .row {
				overflow: hidden;
				overflow: clip;
			}
		}
	}
</style>
