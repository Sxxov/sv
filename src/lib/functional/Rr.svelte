<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Readable } from 'svelte/store';

	type T = $$Generic;
	type TT = $$Generic<Record<string, Readable<T>>>;

	export let rr: TT;

	let values: {
		[k in keyof TT]: TT[k] extends Readable<infer U> ? U : never;
	} = {} as any;

	$: unsubscribes =
		(destroy(),
		Object.entries(rr).map(([k, r]) =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return
			r.subscribe((v) => {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
				values[k as keyof TT] = v as any;
			}),
		));

	const destroy = () => {
		values = {} as any;
		if (unsubscribes) for (const unsubscribe of unsubscribes) unsubscribe();
	};

	onDestroy(() => {
		destroy();
	});
</script>

<slot v={values} />
