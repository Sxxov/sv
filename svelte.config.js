import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';

const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [
		preprocess({
			postcss: true,
		}),
	],
	compilerOptions: {
		dev: !production,
	},
	kit: {
		adapter: netlify(),
		files: {
			appTemplate: 'src/app.html',
		},
	},
	vitePlugin: {},
};
