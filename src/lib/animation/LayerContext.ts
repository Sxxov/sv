import type { Layer, TrackKeyframeValue } from '@sxxov/ut/animation';

export interface LayerContext<V extends TrackKeyframeValue> {
	layer: Layer<V>;
}
