import type { SvelteComponent } from 'svelte';

export type TVariants<T extends SvelteComponent> = TLeaf<T['$$prop_def']>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TLeaf<T> = {
	[n: string]: T | TLeaf<T>;
};
