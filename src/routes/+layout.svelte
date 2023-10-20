<slot />

<svelte:head>
	<meta charset="utf-8" />

	<!-- Viewport Tag to prevent jank -->
	<meta
		name="viewport"
		content="width=device-width, initial-scale=1"
	/>
</svelte:head>

<style lang="postcss">
	:global(:root) {
		----font-family-display: 'Gloock', 'Times New Roman', serif;
		----font-family-sans: 'Space Grotesk', 'Inter', 'Helvetica', sans-serif;

		----padding: clamp(8px, 8%, 28px);
		----roundness: 14px;

		----ease-fast-slow: cubic-bezier(0.075, 0.82, 0.165, 1);
		----ease-slow-slow: cubic-bezier(0.77, 0, 0.175, 1);
		----ease-slow-fast: cubic-bezier(0.5, 0, 0.75, 0);

		/* colour */
		----colour-background-transparent: #0c0c0d00;
		----colour-background-primary: #0c0c0d;
		----colour-background-secondary: #19191b;
		----colour-background-tertiary: #212124;
		----colour-accent-transparent: #ffa4aa00;
		----colour-accent-primary: #ffa4aa;
		----colour-accent-secondary: #ffa4aa66;
		----colour-accent-tertiary: #ffa4aa33;
		----colour-text-transparent: #f1f5f900;
		----colour-text-primary: #f1f5f9;
		----colour-text-secondary: #f1f5f9;
		----colour-text-tertiary: #e2e8f033;
		----colour-overlay: #0008;

		/* shadow */
		----shadow-glow-sm: 0 1px 2px 0 var(--colour-accent-secondary);
		----shadow-glow-md: 0 4px 4px -1px var(--colour-accent-secondary);
		----shadow-glow-lg: 0 8px 8px -1px var(--colour-accent-secondary);
		----shadow-glow-xl: 0 16px 16px -1px var(--colour-accent-secondary);
		----shadow-glow-2xl: 0 25px 25px -3px var(--colour-accent-secondary);
		----shadow-glow-3xl: 0 35px 35px -5px var(--colour-accent-secondary);
		----shadow-glow-none: 0 0 0 0 var(--colour-accent-secondary);
		----shadow-sm: 1px 1px 2px 0 rgb(0 0 0 / 30%),
			-1px -1px 2px 0 rgb(241 245 249 / 10%);
		----shadow-md: 2px 2px 16px -1px rgb(0 0 0 / 52%),
			-2px -2px 16px -1px rgb(241 245 249 / 16%);
		----shadow-lg: 5px 5px 25px -3px rgb(0 0 0 / 50%),
			-5px -5px 25px -3px rgb(241 245 249 / 16%);
		----shadow-xl: 10px 10px 35px -5px rgb(0 0 0 / 58%),
			-10px -10px 35px -5px rgb(241 245 249 / 16%);
		----shadow-2xl: 12.5px 12.5px 60px -12px rgb(0 0 0 / 70%),
			-12.5px -12.5px 60px -12px rgb(241 245 249 / 25%);
		----shadow-3xl: 17.5px 17.5px 70px -15px rgb(0 0 0 / 80%),
			-17.5px -17.5px 70px -15px rgb(241 245 249 / 30%);
		----shadow-none: 0 0 0 0 rgb(0 0 0 / 10%), 0 0 0 0 rgb(241 245 249 / 5%);
		----shadow-inner-sm: inset 1px 1px 2px 0 rgb(0 0 0 / 10%),
			inset -1px -1px 2px 0 rgb(241 245 249 / 5%);
		----shadow-inner-md: inset 2px 2px 16px -1px rgb(0 0 0 / 32%),
			inset -2px -2px 16px -1px rgb(241 245 249 / 16%);
		----shadow-inner-lg: inset 5px 5px 25px -3px rgb(0 0 0 / 30%),
			inset -5px -5px 25px -3px rgb(241 245 249 / 15%);
		----shadow-inner-xl: inset 10px 10px 35px -5px rgb(0 0 0 / 28%),
			inset -10px -10px 35px -5px rgb(241 245 249 / 14%);
		----shadow-inner-2xl: inset 12.5px 12.5px 60px -12px rgb(0 0 0 / 50%),
			inset -12.5px -12.5px 60px -12px rgb(241 245 249 / 25%);
		----shadow-inner-3xl: inset 17.5px 17.5px 70px -15px rgb(0 0 0 / 60%),
			inset -17.5px -17.5px 70px -15px rgb(241 245 249 / 30%);
		----shadow-inner-none: inset 0 0 0 0 rgb(0 0 0 / 10%),
			inset 0 0 0 0 rgb(241 245 249 / 5%);
	}

	:global(:root) {
		background: var(----colour-background-primary);
	}

	:global(h1) {
		color: var(----colour-accent-primary);
		font-family: var(----font-family-display);
		font-weight: 100;

		font-size: 4rem;
		margin-bottom: 0.7em;
		line-height: 0.8;

		letter-spacing: -0.04em;
	}

	:global(h2) {
		color: var(----colour-accent-primary);
		font-family: var(----font-family-display);
		font-weight: 300;

		font-size: 3rem;
		margin-bottom: 0.7em;
		line-height: 0.8;
	}

	:global(h3) {
		color: var(----colour-accent-secondary);
		text-stroke: 0.5px var(----colour-accent-primary);
		-webkit-text-stroke: 0.5px var(----colour-accent-primary);
		font-family: var(----font-family-display);
		font-weight: 300;

		font-size: 2.26rem;
		margin-bottom: 0.7em;
		line-height: 0.8;
	}

	:global(h4) {
		color: var(----colour-text-primary);
		font-family: var(----font-family-display);
		font-weight: 300;

		font-size: 2.26rem;
		margin-bottom: 0.7em;
		line-height: 0.8;
	}

	:global(h5) {
		color: var(----colour-text-primary);
		font-family: var(----font-family-sans);
		font-weight: 700;
		text-transform: uppercase;

		font-size: 1.6rem;
		margin-bottom: 0.7em;
		line-height: 1;
	}

	:global(h6) {
		color: var(----colour-text-primary);
		font-family: var(----font-family-sans);
		font-weight: 500;
		text-transform: uppercase;

		font-size: 1.6rem;
		margin-bottom: 0.7em;
		line-height: 1;
	}

	:global(p, input, textarea, label, button) {
		color: var(----colour-text-primary);
		font-family: var(----font-family-sans);
	}

	:global(input, textarea, label, button) {
		font-size: 1em;
	}

	:global(hr) {
		width: 100%;
		border: 0;
		border-top: 1px solid var(----colour-text-primary);
		margin-block-start: 0.5em;
		margin-block-end: 0.5em;
		opacity: 0.3;
	}

	:global(a:any-link) {
		color: var(----colour-accent-primary);
		text-underline-offset: 0.2em;
	}
</style>
