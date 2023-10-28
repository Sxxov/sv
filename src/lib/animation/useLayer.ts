import { getContext } from 'svelte';
import { layerContextKey } from './Layer.svelte';
import type { LayerContext } from './LayerContext';
import type { TrackKeyframeValue } from '@sxxov/ut/animation';

export const useLayer = <V extends TrackKeyframeValue>():
	| LayerContext<V>
	| undefined => getContext(layerContextKey);
