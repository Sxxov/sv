<script lang="ts">
	import { whenResize } from '../ut/use/whenResize';

	import { css, type TCss } from '@sxxov/ut/css';

	type T = $$Generic<Record<any, any>>;

	export let items: T[];
	export let width: TCss = '100%';
	export let columnWidth: TCss = '300px';
	export let height: TCss = '100%';
	export let gap: TCss = 'var(--padding, 28px)';

	let componentDiv: HTMLDivElement | undefined;
	let itemDivs: HTMLDivElement[] = [];
	let isDirty = true;

	$: itemDivs.length = items.length;

	$: if (isDirty) {
		isDirty = false;

		const colCount = componentDiv
			? getComputedStyle(componentDiv)
					.getPropertyValue('grid-template-columns')
					.split(' ').length
			: 0;

		if (colCount > 0)
			for (let i = 0; i < itemDivs.length; ++i) {
				const itemDiv = itemDivs[i]!;
				const topItemDiv = itemDivs[i - colCount];

				itemDiv.style.marginTop = '0';
				itemDiv.style.marginTop = topItemDiv
					? `calc(${
							topItemDiv.getBoundingClientRect().bottom
					  }px + ${css(gap)} - ${
							itemDiv.getBoundingClientRect().top
					  }px)`
					: '0';
			}
	}
</script>

<div
	_="<Masonry>"
	class="component"
	style="
		--width: {css(width)};
		--width-column: {css(columnWidth)};
		--height: {css(height)};
		--gap: {css(gap)};
	"
	bind:this={componentDiv}
>
	{#each items as item, i}
		<div
			class="item"
			use:whenResize={() => {
				isDirty = true;
			}}
			bind:this={itemDivs[i]}
		>
			<slot {item} />
		</div>
	{/each}
</div>

<style lang="postcss">
	.component {
		display: grid;
		justify-items: start;
		align-items: start;
		grid-template-columns: repeat(
			auto-fill,
			minmax(min(var(--width-column), 100%), 1fr)
		);
		grid-auto-rows: auto;
		gap: 0 var(--gap);
		width: var(--width);
		height: var(--height);

		& > .item {
			width: 100%;
			height: auto;

			& > :global(*) {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
