<script lang="ts">
	import { css, type Css } from '@sxxov/ut/css';

	export let height: Css = 0;
	export let width: Css = 0;
</script>

<div
	class="spacer"
	style="
		--width: {css(width)};
		--height: {css(height)};
	"
/>

<style>
	.spacer {
		width: var(--width);
		height: var(--height);

		user-select: none;
		pointer-events: none;
	}
</style>
