import type { SvelteComponent, ComponentProps } from 'svelte';

export type Variants<T extends SvelteComponent> = Branch<ComponentProps<T>>;

interface Branch<T> {
	[n: string]: Partial<T> | Branch<T>;
}
