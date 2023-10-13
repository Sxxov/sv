import type { TransitionConfig, TransitionFrame } from '..';
import type { Transition } from '../Transition';

export const sustain: Transition = (
	element: Element,
	{ delay = 0 }: { delay?: number } = {},
) => ({
	delay,
	duration: 0,
	easing: (t) => t,
	css: (t) => `display: ${t > 0 ? '' : 'none'}`,
});
