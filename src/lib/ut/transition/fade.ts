import { quintIn, quintInOut, quintOut } from 'svelte/easing';
import type { TransitionConfig } from './common/TransitionConfig';
import type { Transition } from './common/Transition';
import type { TransitionFrame } from './common/TransitionFrame';

export const fade: Transition = (
	element: Element,
	{ delay = 0, duration = 200, easing = quintInOut }: TransitionConfig = {},
	tick?: TransitionFrame['tick'],
) => {
	const { opacity } = getComputedStyle(element);

	return {
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t * Number(opacity)}`,
		...(tick && { tick }),
	};
};

export const fadeIn: Transition = (
	element: Element,
	options?: TransitionConfig,
) => {
	return fade(element, {
		easing: quintOut,
		...options,
	});
};

export const fadeOut: Transition = (
	element: Element,
	options?: TransitionConfig,
) => {
	return fade(element, {
		easing: quintIn,
		...options,
	});
};
