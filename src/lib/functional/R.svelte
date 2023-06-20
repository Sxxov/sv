<script lang="ts">
	import type { Readable } from 'svelte/store';

	type T = $$Generic;

	export let r: Readable<T>;
</script>

<slot v={$r} />
