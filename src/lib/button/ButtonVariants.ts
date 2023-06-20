import type Button from './Button.svelte';

const Primary = {
	colourBackground: '----colour-accent-tertiary',
	colourBackgroundHover: '----colour-accent-secondary',
	colourText: '----colour-accent-primary',
	colourTextHover: '----colour-accent-primary',
} satisfies Button['$$prop_def'];

const Secondary = {
	colourBackground: '----colour-background-secondary',
	colourBackgroundHover: '----colour-background-tertiary',
	colourText: '----colour-text-primary',
	colourTextHover: '----colour-text-primary',
} satisfies Button['$$prop_def'];

const FabRegularPrimary = {
	...Primary,
	width: '56px',
	height: '56px',
	padding: '16px',
} satisfies Button['$$prop_def'];

const FabRegularSecondary = {
	...Secondary,
	width: '56px',
	height: '56px',
	padding: '16px',
} satisfies Button['$$prop_def'];

const FabSmallPrimary = {
	...Primary,
	width: '28px',
	height: '28px',
	padding: '2px',
} satisfies Button['$$prop_def'];

const FabSmallSecondary = {
	...Secondary,
	width: '28px',
	height: '28px',
	padding: '2px',
} satisfies Button['$$prop_def'];

export const ButtonVariants = {
	Primary,
	Secondary,
	FabRegularPrimary,
	FabRegularSecondary,
	FabSmallPrimary,
	FabSmallSecondary,
} as const;
