import type { TVariants } from '../common/types/TVariants';
import type Button from './Button.svelte';

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
		shadow: '----shadow-none',
		shadowHover: '----shadow-md',
	},
	Fab: {
		Lg: {
			width: '112px',
			height: '112px',
			padding: '32px',
		},
		Md: {
			width: '56px',
			height: '56px',
			padding: '16px',
		},
		Sm: {
			width: '28px',
			height: '28px',
			padding: '2px',
		},
	},
	Shadow: {
		Xl: {
			shadow: 'var(----shadow-inner-sm), var(----shadow-xl)',
		},
		Lg: {
			shadow: 'var(----shadow-inner-sm), var(----shadow-lg)',
		},
		Md: {
			shadow: 'var(----shadow-inner-sm), var(----shadow-md)',
		},
		Sm: {
			shadow: 'var(----shadow-inner-sm), var(----shadow-sm)',
		},
		None: {
			shadow: 'var(----shadow-inner-none), var(----shadow-none)',
		},
	},
} as const satisfies TVariants<Button>;
