import type { SvelteComponent, ComponentProps } from 'svelte';

export type TVariants<T extends SvelteComponent> = TBranch<ComponentProps<T>>;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TBranch<T> = {
	[n: string]: Partial<T> | TBranch<T>;
};
