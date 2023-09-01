import type * as easings from 'svelte/easing';

export interface TransitionConfig {
	delay?: number;
	duration?: number;
	easing?: (typeof easings)[keyof typeof easings];
}
