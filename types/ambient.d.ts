declare module '*.svg?raw' {
	declare const content: `<svg${string}`;
	export default content;
}

/**
 * Image that is being piped through to `vite-imagetools`
 *
 * @see https://github.com/JonasKruckenberg/imagetools/blob/main/docs/directives.md
 */
declare module '*&imagetools' {
	const src: string;
	export default src;
}

/** Remote module, downloaded at build time */
declare module 'remote:http://*' {}

/** Remote module, downloaded at build time */
declare module 'remote:https://*' {}

declare namespace svelteHTML {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	export interface HTMLAttributes<T> {
		/**
		 * Descriptor for component. Used on the root element of every component
		 * & route
		 *
		 * @example <caption>Button.svelte</caption>
		 * 	<div
		 * 		_='<Button>'
		 * 		class='component'
		 * 	/>;
		 */
		_?: `<${string}>` | `/${string}`;
	}
}
