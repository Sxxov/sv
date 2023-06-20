import { expoIn, expoOut } from 'svelte/easing';
import type { ITransitionConfig } from './common/ITransitionConfig';
import type { TTransition } from './common/TTransition';
import { TransitionFrameThing } from './common/TransitionFrameThing';

export const dropIn: TTransition = (
	element: Element,
	{ delay = 0, duration = 500, easing = expoOut }: ITransitionConfig = {},
) => {
	const computed = getComputedStyle(element);
	const opacity = Number(computed.opacity);
	const transform = computed.transform === 'none' ? '' : computed.transform;

	return TransitionFrameThing.from({
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translateY(${u * -20}px);
			opacity: ${opacity * Math.min(t * 2, 1)};
		`,
	});
};

export const dropOut: TTransition = (
	element: Element,
	{ delay = 0, duration = 200, easing = expoIn }: ITransitionConfig = {},
) => {
	const computed = getComputedStyle(element);
	const opacity = Number(computed.opacity);
	const transform = computed.transform === 'none' ? '' : computed.transform;

	return TransitionFrameThing.from({
		delay,
		duration,
		easing,
		css: (t, u) => `
			transform: ${transform} translateY(${u * -20}px);
			opacity: ${opacity * t};
		`,
	});
};
