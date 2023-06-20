import { linear } from 'svelte/easing';
import type { ITransitionConfig } from './common/ITransitionConfig';
import type { TTransition } from './common/TTransition';

export const accumulate = (
	transition: TTransition,
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
					}: ITransitionConfig = {},
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
