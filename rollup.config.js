import modulepreload from 'rollup-plugin-modulepreload'
import del from 'rollup-plugin-delete'
import fg from 'fast-glob'
import {terser} from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import css from 'rollup-plugin-css-only'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import minifyHTML from 'rollup-plugin-minify-html-literals'
const production = process.env.NODE_ENV == 'production'
function shouldPreload({code}) {
	return !!code && code.includes('markdown-element')
}
export default {
	input: 'wiki/index.js',
	treeshake: production,
	output: {
		dir: 'output',
		format: 'es',
		preserveModules: !production,
		preserveModulesRoot: 'wiki',
	},
	watch: {
		exclude: 'node_modules/**, server/**',
	},
	preserveEntrySignatures: 'allow-extension',
	plugins: [
		del({targets: 'output/*', runOnce: true}),
		nodeResolve({moduleDirectories: ['node_modules', 'wiki']}),
		css({output: 'bundle.css'}),
		copy({
			targets: [
				{src: 'wiki/images/*', dest: 'output/images'},
				{src: 'wiki/manifest.json', dest: 'output'},
				{src: 'wiki/service-worker.js', dest: 'output'},
				{src: 'wiki/index.html', dest: 'output'},
				{src: 'wiki/js/sendAuthenticated.js', dest: 'output'},
				{src: 'wiki/robots.txt', dest: 'output'},
				{src: 'node_modules/prismjs/themes/prism.css', dest: 'output/node_modules/prismjs/themes'},
				{src: 'node_modules/@fortawesome/fontawesome-free/sprites', dest: 'output/node_modules/@fortawesome/fontawesome-free'},
				...(production ? [{src: 'node_modules/@lrnwebcomponents/simple-icon/lib/svgs', dest: 'output'}] : [{src: 'node_modules/@lrnwebcomponents/simple-icon/lib/svgs', dest: 'output/node_modules/@lrnwebcomponents/simple-icon/lib'}]),
			],
		}),
		modulepreload({
			prefix: '',
			index: 'output/index.html',
			shouldPreload,
		}),
		...(production
			? [minifyHTML(), terser()]
			: [
					{
						name: 'watch-external',
						async buildStart() {
							const files = await fg('wiki/**/*')
							for (let file of files) {
								this.addWatchFile(file)
							}
						},
					},
			  ]),
	],
}
