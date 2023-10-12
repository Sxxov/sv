import { expoIn, expoOut } from 'svelte/easing';
import type { TransitionConfig } from '../TransitionConfig';
import type { Transition } from '../Transition';

export const dropIn: Transition = (
	element: Element,
	{ delay = 0, duration = 500, easing = expoOut }: TransitionConfig = {},
) => {
	const computed = getComputedStyle(element);
	const opacity = Number(computed.opacity);
	const transform = computed.transform === 'none' ? '' : computed.transform;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translateY(${u * -20}px);
			opacity: ${opacity * Math.min(t * 2, 1)};
		`,
	};
};

export const dropOut: Transition = (
	element: Element,
	{ delay = 0, duration = 200, easing = expoIn }: TransitionConfig = {},
) => {
	const computed = getComputedStyle(element);
	const opacity = Number(computed.opacity);
	const transform = computed.transform === 'none' ? '' : computed.transform;

	return {
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translateY(${u * -20}px);
			opacity: ${opacity * t};
		`,
	};
};
