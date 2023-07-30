import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import { imagetools as viteImagetools } from 'vite-imagetools';
import * as fs from 'node:fs';
import { copy } from 'vite-plugin-copy';
import { fileURLToPath } from 'node:url';
import * as path from 'node:path';
import maicHelper from 'maic/helper';

const production = process.env.NODE_ENV === 'production';
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const remoteCache = /** @type {Map<string, string>} */ (new Map());

export default {
	assetsInclude: ['**/*.glb', '**/*.gltf'],
	server: {
		port: 5174,
	},
	plugins: [
		alias({
			entries: [
				{
					// !p::./a.png
					find: /\.(png|jpg|jpeg|gif)$/,
					replacement: production ? '$1?webp' : '$1',
				},
			],
		}),
		maicHelper({
			enabled: !production,
		}),
		viteImagetools(),
		{
			name: 'svg loader',
			transform(/** @type {string} */ _, /** @type {string} */ path) {
				if (!path.endsWith('.svg')) return null;

				return {
					code: `export default \`${fs.readFileSync(path, 'utf8')}\``,
				};
			},
		},
		{
			name: 'remote loader',

			resolveId(/** @type {string} */ id) {
				if (
					id.startsWith('remote:http:/') ||
					id.startsWith('remote:https:/')
				)
					return `\0${id}`;
			},
			async load(/** @type {string} */ id) {
				if (
					!id.startsWith('\0remote:http:/') &&
					!id.startsWith('\0remote:https:/')
				)
					return null;

				const code = await (
					await fetch(
						id.replace(/^.*remote:http(s)?:\/\/?/, 'http$1://'),
					)
				).text();

				remoteCache.set(id, code);

				return {
					code,
				};
			},
		},
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		copy([{ src: 'src/assets/raw/**/*', dest: 'static/raw' }]),
		sveltekit(),
		basicSsl(),
	],
};
