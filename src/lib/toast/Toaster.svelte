<script
	context="module"
	lang="ts"
>
	export interface ToastRow {
		text: string;
		level?: Levels;
		duration?: number;
	}

	export const toasts = new ArrayStore<ToastRow>();

	let instanceCount = 0;
</script>

<script lang="ts">
	import Hint from '../input/Hint.svelte';
	import { LevelColours } from '../common/enums/LevelColours';
	import { ic_clear } from 'maic/two_tone';
	import { onMount, onDestroy } from 'svelte';
	import { css } from '@sxxov/ut/css';
	import { dropIn, dropOut } from '../ut/transition/drop';
	import Button from '../button/Button.svelte';
	import { ButtonVariants } from '../button/ButtonVariants';
	import Svg from '../svg/Svg.svelte';
	import { ArrayStore } from '@sxxov/ut/store/stores';
	import { Levels } from '../common/enums';

	let toastToTimeoutHandle = new Map<ToastRow, number>();

	onMount(() => {
		if (instanceCount > 0)
			console.warn('Encountered multiple instances of Toaster');

		++instanceCount;
	});

	onDestroy(() => {
		for (const toast of $toasts) dismiss(toast);

		--instanceCount;
	});

	$: for (const toast of $toasts)
		if (toast.duration && !toastToTimeoutHandle.has(toast))
			scheduleDismiss(toast, toast.duration);

	$: for (const [toast] of toastToTimeoutHandle)
		if (!$toasts.includes(toast)) dismiss(toast);

	function dismiss(toast: ToastRow) {
		$toasts = $toasts.filter((v) => v !== toast);
		toastToTimeoutHandle.delete(toast);
		toastToTimeoutHandle = toastToTimeoutHandle;
	}

	function scheduleDismiss(toast: ToastRow, duration: number) {
		if (duration < 0 || !Number.isFinite(duration)) return;

		toastToTimeoutHandle.set(
			toast,
			setTimeout(() => {
				dismiss(toast);
			}, duration),
		);
		toastToTimeoutHandle = toastToTimeoutHandle;
	}
</script>

<div class="toaster">
	{#each $toasts as toast}
		<div
			class="content"
			style="
					--colour-toast: {css(String(LevelColours[toast.level ?? Levels.INFO]))}
				"
			in:dropIn
			out:dropOut
		>
			<Hint
				level={toast.level ?? Levels.INFO}
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
				on:click={() => dismiss(toast)}
			>
				<Svg svg={ic_clear} />
			</Button>
		</div>
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
