import { quintIn, quintInOut, quintOut } from 'svelte/easing';
import type { ITransitionConfig } from './common/ITransitionConfig';
import type { TTransition } from './common/TTransition';
import { TransitionFrameThing } from './common/TransitionFrameThing';

export const scale: TTransition = (
	element: Element,
	{ delay = 0, duration = 200, easing = quintInOut }: ITransitionConfig = {},
	tick?: TransitionFrameThing['tick'],
) => {
	const { transform, opacity } = getComputedStyle(element);

	return TransitionFrameThing.from({
		delay,
		duration,
		easing,
		css: (t) => `
			transform: ${transform} scale(${0.5 + t * 0.5});
			opacity: ${Number(opacity) * Math.min(t * 2, 1)};
		`,
		...(tick && { tick }),
	});
};

export const scaleIn: TTransition = (
	element: Element,
	options?: ITransitionConfig,
) => {
	return scale(element, {
		easing: quintOut,
		...options,
	});
};

export const scaleOut: TTransition = (
	element: Element,
	options?: ITransitionConfig,
) => {
	return scale(element, {
		easing: quintIn,
		...options,
	});
};
