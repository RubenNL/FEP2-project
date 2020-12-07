const proxy = require('koa-proxies');

module.exports = {
	middlewares: [
		proxy('/api/search', {
			target: 'http://localhost:7999',
		})
	],
};