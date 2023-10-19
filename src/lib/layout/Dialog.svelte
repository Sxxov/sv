<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fadeIn, fadeOut } from '../ut/transition/transitions/fade';
	import { dropIn, dropOut } from '../ut/transition/transitions/drop';

	export let active = false;
	export let remainOnOverlayClick = false;
</script>

{#if active}
	<div
		class="overlay"
		role="presentation"
		in:fadeIn
		out:fadeOut={{ easing: quintOut }}
		on:click={() => {
			if (!remainOnOverlayClick) active = false;
		}}
		on:keydown={(event) => {
			if (event.key === 'Escape') event.currentTarget.click();
		}}
	/>
	<div
		class="default content"
		in:dropIn
		out:dropOut
	>
		<div class="default top-right">
			<slot name="top-right" />
		</div>
		<slot
			{active}
			dismiss={() => {
				active = false;
			}}
			show={() => {
				active = true;
			}}
		/>
		<div class="default buttons">
			<slot name="buttons" />
		</div>
	</div>
{/if}

<style lang="postcss">
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 100;

		background: #0005;

		pointer-events: auto;
	}

	.content {
		position: relative;
		z-index: 101;

		width: 100%;
		max-width: 768px;

		background: var(----colour-background-primary);

		box-shadow: var(----shadow-inner-sm), var(----shadow-md);

		pointer-events: auto;

		& > .default.top-right {
			position: absolute;
			top: 0;
			right: 0;
		}

		& > .default.buttons {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(336px, 1fr));
		}
	}
</style>
