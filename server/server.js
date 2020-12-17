const http=require('http')
const { Sequelize } = require('sequelize');
const fs=require('fs')

const sequelize = new Sequelize(process.env.DATABASE_URL?process.env.DATABASE_URL:'sqlite::memory:');
require('./tables.js')(sequelize)
const {getCategories} = require('./category.js')(sequelize);
const {register,login,getUserFromJWT} = require('./loginsignup.js')(sequelize)
const {getArticle,saveArticle,search,getArticlesByCategory} = require('./article.js')(sequelize)

selector=(queryParts,json,req)=>{
	switch(queryParts.shift()) {
		case 'search':
			return search(req.url.split('?')[1])
		case 'register':
			return register(json)
		case 'login':
			return login(json)
		case 'getUser':
			return getUserFromJWT(req.headers.authorization.split(' ')[1]);
		case 'getArticle':
			return getArticle(queryParts.join('/'))
		case 'saveArticle':
			return saveArticle(json);
		case 'getCategories':
			return getCategories();
		case 'getArticlesByCategory':
			return getArticlesByCategory(queryParts.shift());
		default:
			return Promise.resolve('no action found!')
	}
}

http.createServer((req,res)=>{
	res.endJson=data=>{
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(data))
	}
	let data=''
	req.on('data',chunk=>data+=chunk)
	req.on('end',()=>{
		let isJson;
		let json;
		try {
			json=JSON.parse(data);
			isJson=true;
		} catch(e) {
			isJson=false;
		}
		const queryParts=req.url.split('?')[0].split('/');
		queryParts.shift();
		if(queryParts[0]=="api") queryParts.shift();
		selector(queryParts,json,req).then(res.endJson).catch(err=>{
			console.log(err);
			res.endJson(err);
		})
	})
}).listen(7999)
