import { getContext } from 'svelte';
import { compositionContextKey } from '.';
import type { CompositionContext } from './CompositionContext';
import type { TimelineSegmentValue } from '@sxxov/ut/animation';

export const useComposition = <V extends TimelineSegmentValue>():
	| CompositionContext<V>
	| undefined => getContext(compositionContextKey);
