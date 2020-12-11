const proxy = require('koa-proxies');

module.exports = {
	middlewares: [
		proxy('/api', {
			target: 'http://localhost:7999',
		})
	],
};