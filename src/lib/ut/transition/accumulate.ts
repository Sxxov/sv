import { linear } from 'svelte/easing';
import type { TransitionConfig } from './common/TransitionConfig';
import type { Transition } from './common/Transition';

export const accumulate = (
	transition: Transition,
	delayPerAccumulationMs = 50,
) => {
	const indexToAccumulation = new Map<number, number>();

	return new Proxy(
		{},
		{
			get(_, k) {
				const index = Number(k);

				if (Number.isNaN(index)) return undefined;

				const accumulation = indexToAccumulation.get(index) ?? 0;
				indexToAccumulation.set(
					index,
					accumulation + delayPerAccumulationMs,
				);

				return (
					element: Element,
					{
						delay = 0,
						duration = 0,
						easing = linear,
					}: TransitionConfig = {},
				) => {
					return transition(element, {
						delay: delay + accumulation,
						duration,
						easing,
					});
				};
			},
		},
	);
};
