import type { TransitionConfig } from './TransitionConfig';
import type { TransitionFrame } from './TransitionFrame';

export type Transition = (
	element: Element,
	options?: TransitionConfig,
) => TransitionFrame;
