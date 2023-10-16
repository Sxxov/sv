import { getContext } from 'svelte';
import { compositionContextKey } from '.';
import type { CompositionContext } from './CompositionContext';

export const useComposition = (): CompositionContext | undefined =>
	getContext<CompositionContext>(compositionContextKey);
