import type { TTransition } from './common/TTransition';
import { TransitionFrameThing } from './common/TransitionFrameThing';

export const sustain: TTransition = () => {
	return TransitionFrameThing.from({
		delay: 0,
		duration: 0,
		easing: (t) => t,
		css: () => '',
	});
};
