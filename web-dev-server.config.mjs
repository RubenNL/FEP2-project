import proxy from 'koa-proxies';

export default {
	middleware: [
		proxy('/api', {
			target: 'http://localhost:7999',
		}),
	],
};
