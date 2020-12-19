import del from 'rollup-plugin-delete'
import {terser} from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only';
import { nodeResolve } from '@rollup/plugin-node-resolve';
const production=process.env.NODE_ENV=="production"
console.log("ENVIRONMENT:",production?'prod':'dev')
export default {
	input: 'wiki/index.js',
	treeshake:production,
	output: {
		dir: 'output',
		format: 'es',
		preserveModules: !production
	},
	preserveEntrySignatures: "allow-extension",
	plugins: [
		del({targets: 'output/*'}),
		nodeResolve({moduleDirectories:['node_modules','wiki']}),
		css({output: 'bundle.css'}),
		copy({
			targets: [
				{src:'wiki/images/*',dest:'output/images'},
				{src:'wiki/manifest.json',dest:'output'},
				{src:'wiki/service-worker.js',dest:'output'},
				{src:'wiki/index.html',dest:'output'},
				{src:'wiki/js/sendAuthenticated.js',dest:'output'},
			]
		}),
		...production?[terser()]:[]
	]
};
