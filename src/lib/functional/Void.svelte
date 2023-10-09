<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	const dispatch = createEventDispatcher();

	onMount(() => {
		dispatch('in');
	});

	onDestroy(() => {
		dispatch('out');
	});
</script>
