import type * as easings from 'svelte/easing';

export interface ITransitionConfig {
	delay?: number;
	duration?: number;
	easing?: (typeof easings)[keyof typeof easings];
}
