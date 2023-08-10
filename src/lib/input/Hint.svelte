<script lang="ts">
	import { ic_info, ic_done, ic_error, ic_warning } from 'maic/two_tone';
	import { LevelColours } from '../common/enums/LevelColours';
	import { Levels } from '../common/enums/Levels';
	import { css, type TCss } from '@sxxov/ut/css';
	import Svg from '../svg/Svg.svelte';

	export let level: Levels = Levels.INFO;
	export let colourOverride: TCss | undefined = undefined;
	export let tabindex = -1;

	const LevelIconSvg = [
		ic_info,
		ic_warning,
		ic_error,
		ic_done,
		'<svg></svg>',
	] as const;

	$: colour = colourOverride ?? LevelColours[level] ?? '';
</script>

<div
	class="hint"
	role="treeitem"
	aria-selected="false"
	{tabindex}
	on:click
	on:keydown
	on:keyup
	on:keypress
>
	<span
		class:none={level === Levels.NONE}
		class="content"
	>
		{#if LevelIconSvg[level]}
			<Svg
				svg={LevelIconSvg[level]}
				width={16}
				colour={css(colour)}
			/>
		{/if}
		{#if $$slots.default}
			<p
				class="text"
				style="
					--colour: {css(colour)};
				"
			>
				<slot />
			</p>
		{/if}
	</span>
</div>

<style lang="postcss">
	.hint {
		& > .content {
			display: flex;
			align-items: center;

			gap: 12px;

			overflow: hidden;

			opacity: 1;
			min-height: calc(1rem + 2em);

			transition: 0.2s var(----ease-slow-slow);

			&.none {
				opacity: 0;
				height: 0;
			}

			& > p {
				color: var(--colour);

				transition: 0.2s var(----ease-slow-slow);
			}
		}
	}
</style>
