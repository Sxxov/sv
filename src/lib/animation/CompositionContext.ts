import type {
	Composition,
	CompositionFrame,
	TimelineSegmentValue,
} from '@sxxov/ut/animation';

export interface CompositionContext<V extends TimelineSegmentValue> {
	composition: Composition<V>;
}
