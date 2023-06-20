import type { ITransitionConfig } from './ITransitionConfig';
import type { TransitionFrameThing } from './TransitionFrameThing';

export type TTransition = (
	element: Element,
	options?: ITransitionConfig,
) => TransitionFrameThing;
