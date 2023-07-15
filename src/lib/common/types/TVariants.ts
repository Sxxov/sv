import type { SvelteComponent, ComponentProps } from 'svelte';

export type TVariants<T extends SvelteComponent> = TLeaf<ComponentProps<T>>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TLeaf<T> = {
	[n: string]: T | TLeaf<T>;
};
