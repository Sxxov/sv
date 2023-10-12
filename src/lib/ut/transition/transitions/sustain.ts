import type { Transition } from '../Transition';

export const sustain: Transition = () => ({
	delay: 0,
	duration: 0,
	easing: (t) => t,
	css: () => '',
});
