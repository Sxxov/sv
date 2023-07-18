<script
	context="module"
	lang="ts"
>
	import { ArrayStore } from '@sxxov/ut/store/stores';

	export const toasts = new ArrayStore<IToastThing>();

	let instanceCount = 0;
</script>

<script lang="ts">
	import Hint from '../input/Hint.svelte';
	import Spacer from '../layout/Spacer.svelte';
	import { LevelColours } from '../common/enums/LevelColours';
	import type { IToastThing } from './ToastThing';
	import { ic_clear } from 'maic/two_tone';
	import { onMount, onDestroy } from 'svelte';
	import { css } from '@sxxov/ut/css';
	import { dropIn, dropOut } from '../ut/transition/drop';
	import Button from '../button/Button.svelte';
	import { ButtonVariants } from '../button/ButtonVariants';
	import Svg from '../svg/Svg.svelte';

	const scheduledUids: string[] = [];

	onMount(() => {
		if (instanceCount > 0)
			console.warn('Encountered multiple instances of Toaster');

		++instanceCount;
	});

	onDestroy(() => {
		--instanceCount;
	});

	$: for (const toast of $toasts) scheduleDismiss(toast.uid, toast.duration);

	function dismiss(uid: string) {
		toasts.splice(
			toasts.findIndex((toast) => toast.uid === uid),
			1,
		);
	}

	function scheduleDismiss(uid: string, duration: number) {
		if (scheduledUids.includes(uid)) {
			return;
		}

		if (duration < 0) {
			return;
		}

		setTimeout(() => {
			dismiss(uid);
		}, duration);

		scheduledUids.push(uid);
	}
</script>

<div class="toaster">
	{#each $toasts as toast}
		<Spacer height={8} />
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
				colourOverride="--colour-text-primary"
			>
				{toast.text}
			</Hint>
			<Button
				{...ButtonVariants.Secondary}
				{...ButtonVariants.Fab.Sm}
				colourBackground="transparent"
				colourBackgroundHover="#fff2"
				on:click={() => dismiss(toast.uid)}
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

		margin: var(--padding);

		z-index: 1000;

		& > .content {
			background: var(--colour-toast);

			padding: 4px 24px;
			margin-top: 8px;

			display: flex;
			justify-content: center;
			align-items: center;
			gap: 12px;

			border-radius: var(----roundness);

			width: max-content;
			max-width: 25vw;
			max-width: min(400px, calc(100vw - var(----padding) * 2));

			box-sizing: border-box;

			float: right;

			box-shadow: var(----shadow-md), var(----shadow-inner-sm);
		}
	}
</style>
