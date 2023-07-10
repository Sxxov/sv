import type Button from './Button.svelte';

interface ILeaf<T> {
	[n: string]: T | ILeaf<T>;
}

export const ButtonVariants = {
	Primary: {
		colourBackground: '----colour-accent-tertiary',
		colourBackgroundHover: '----colour-accent-secondary',
		colourText: '----colour-accent-primary',
		colourTextHover: '----colour-accent-primary',
	},
	Secondary: {
		colourBackground: '----colour-background-secondary',
		colourBackgroundHover: '----colour-background-tertiary',
		colourText: '----colour-text-primary',
		colourTextHover: '----colour-text-primary',
	},
	Transparent: {
		colourBackground: '----colour-background-transparent',
		colourBackgroundHover: '----colour-background-secondary',
		colourText: '----colour-text-primary',
		colourTextHover: '----colour-text-primary',
	},
	Fab: {
		Regular: {
			width: '56px',
			height: '56px',
			padding: '16px',
		},
		Small: {
			width: '28px',
			height: '28px',
			padding: '2px',
		},
	},
} as const satisfies ILeaf<Button['$$prop_def']>;
