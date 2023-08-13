<script
	context="module"
	lang="ts"
>
	import { ArrayStore } from '@sxxov/ut/store/stores';

	type TToastInit = ConstructorParameters<typeof ToastThing>[0];

	export const toasts = new ArrayStore<TToastInit>();

	let instanceCount = 0;
</script>

<script lang="ts">
	import Hint from '../input/Hint.svelte';
	import { LevelColours } from '../common/enums/LevelColours';
	import { ToastThing } from './ToastThing';
	import { ic_clear } from 'maic/two_tone';
	import { onMount, onDestroy } from 'svelte';
	import { css } from '@sxxov/ut/css';
	import { dropIn, dropOut } from '../ut/transition/drop';
	import Button from '../button/Button.svelte';
	import { ButtonVariants } from '../button/ButtonVariants';
	import Svg from '../svg/Svg.svelte';

	const initToTimeoutHandle = new Map<TToastInit, number>();
	const initToToastThing = new Map<TToastInit, ToastThing>();

	onMount(() => {
		if (instanceCount > 0)
			console.warn('Encountered multiple instances of Toaster');

		++instanceCount;
	});

	onDestroy(() => {
		for (const init of $toasts) dismiss(init);

		--instanceCount;
	});

	$: for (const init of $toasts) {
		if (initToTimeoutHandle.has(init)) continue;

		let thing = initToToastThing.get(init);

		if (!thing) {
			thing = new ToastThing(init);
			initToToastThing.set(init, thing);
		}

		scheduleDismiss(init, thing.duration);
	}

	$: for (const [init] of initToTimeoutHandle)
		if (!$toasts.includes(init)) dismiss(init);

	function dismiss(init: TToastInit) {
		toasts.splice(toasts.indexOf(init), 1);
		initToToastThing.delete(init);
		initToTimeoutHandle.delete(init);
	}

	function scheduleDismiss(init: TToastInit, duration: number) {
		if (duration < 0 || !Number.isFinite(duration)) return;

		initToTimeoutHandle.set(
			init,
			setTimeout(() => {
				dismiss(init);
			}, duration),
		);
	}
</script>

<div class="toaster">
	{#each $toasts as init}
		{@const toast = initToToastThing.get(init)}
		{#if toast}
			<div
				class="content"
				style="
					--colour-toast: {css(String(LevelColours[toast.level]))}
				"
				in:dropIn
				out:dropOut
			>
				<Hint
					level={toast.level}
					colourOverride="----colour-text-primary"
				>
					{toast.text}
				</Hint>
				<Button
					{...ButtonVariants.Secondary}
					{...ButtonVariants.Fab.Sm}
					{...ButtonVariants.Shadow.Sm}
					colourBackground="transparent"
					colourBackgroundHover="#fff2"
					on:click={() => dismiss(init)}
				>
					<Svg svg={ic_clear} />
				</Button>
			</div>
		{/if}
	{/each}
</div>

<style lang="postcss">
	.toaster {
		position: fixed;

		right: 0;
		bottom: 0;

		padding: var(----padding);
		box-sizing: border-box;

		z-index: 1000;

		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 7px;

		width: max-content;
		max-width: 100%;

		& > .content {
			background: var(--colour-toast);

			padding: 3.5px 14px 3.5px 21px;

			display: flex;
			justify-content: center;
			align-items: center;
			gap: 14px;

			border-radius: var(----roundness);

			width: max-content;
			max-width: min(400px, 100%);

			box-sizing: border-box;

			box-shadow: var(----shadow-md), var(----shadow-inner-sm);
		}
	}
</style>
