<script lang="ts">
	import { css, type TCss } from '@sxxov/ut/css';

	export let height: TCss = 0;
	export let width: TCss = 0;
</script>

<div
	class="component"
	style="
		--width: {css(width)};
		--height: {css(height)};
	"
/>

<style>
	.component {
		width: var(--width);
		height: var(--height);

		user-select: none;
		pointer-events: none;
	}
</style>
