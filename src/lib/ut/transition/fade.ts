import { quintIn, quintInOut, quintOut } from 'svelte/easing';
import type { ITransitionConfig } from './common/ITransitionConfig';
import type { TTransition } from './common/TTransition';
import { TransitionFrameThing } from './common/TransitionFrameThing';

export const fade: TTransition = (
	element: Element,
	{ delay = 0, duration = 200, easing = quintInOut }: ITransitionConfig = {},
	tick?: TransitionFrameThing['tick'],
) => {
	const { opacity } = getComputedStyle(element);

	return TransitionFrameThing.from({
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t * Number(opacity)}`,
		...(tick && { tick }),
	});
};

export const fadeIn: TTransition = (
	element: Element,
	options?: ITransitionConfig,
) => {
	return fade(element, {
		easing: quintOut,
		...options,
	});
};

export const fadeOut: TTransition = (
	element: Element,
	options?: ITransitionConfig,
) => {
	return fade(element, {
		easing: quintIn,
		...options,
	});
};
