import type { Transition } from './common/Transition';

export const sustain: Transition = () => ({
	delay: 0,
	duration: 0,
	easing: (t) => t,
	css: () => '',
});
