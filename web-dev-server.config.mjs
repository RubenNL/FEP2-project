import proxy from 'koa-proxies';

export default {
	middleware: [
		proxy('/api', {
			target: 'http://localhost:7999',
		}),
		function rewriteToWiki(context, next) {
			if(!context.url.includes('node_modules')) context.url='/wiki'+context.url
			return next();
		},
	],
};
