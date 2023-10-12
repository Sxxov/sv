import { quintIn, quintInOut, quintOut } from 'svelte/easing';
import type { TransitionConfig } from '../common/TransitionConfig';
import type { Transition } from '../common/Transition';
import type { TransitionFrame } from '../common/TransitionFrame';

export const scale: Transition = (
	element: Element,
	{ delay = 0, duration = 200, easing = quintInOut }: TransitionConfig = {},
	tick?: TransitionFrame['tick'],
) => {
	const { transform, opacity } = getComputedStyle(element);

	return {
		delay,
		duration,
		easing,
		css: (t) => `
			transform: ${transform} scale(${0.5 + t * 0.5});
			opacity: ${Number(opacity) * Math.min(t * 2, 1)};
		`,
		...(tick && { tick }),
	};
};

export const scaleIn: Transition = (
	element: Element,
	options?: TransitionConfig,
) => {
	return scale(element, {
		easing: quintOut,
		...options,
	});
};

export const scaleOut: Transition = (
	element: Element,
	options?: TransitionConfig,
) => {
	return scale(element, {
		easing: quintIn,
		...options,
	});
};
