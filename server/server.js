const { Sequelize } = require('sequelize');

module.exports=app=>{
	app.get('/sitemap.txt',requestHandler)
	app.get('/api/*',requestHandler)
	app.post('/api/*',requestHandler)
}
requestHandler=(req,res)=>{
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
		selector(queryParts,json,req,res).then(response=>{
			if(typeof response=="object") res.endJson(response)
			else {
				res.setHeader('Content-Type', 'text/plain; charset=utf-8');
				res.end(response)
			}
		}).catch(err=>{
			console.log(err);
			res.endJson(err);
		})
	})
}
const sequelize = new Sequelize(process.env.DATABASE_URL?process.env.DATABASE_URL:'sqlite:data.db');
let selector;
require('./tables.js')(sequelize).then(()=>{
	const {addCategory,getCategories,getCategory} = require('./category.js')(sequelize);
	const {register,login,getUserFromJWT,getUsers,updateUser,deleteUser} = require('./loginsignup.js')(sequelize)
	const {getArticle,saveArticle,search,getArticlesByCategory,getArticlePreview} = require('./article.js')(sequelize)
	const adminOnly=req=>getUserFromJWT(req.headers.authorization.split(' ')[1]).then(user=>{
		if(user.blocked) throw Error();
		if(user.functie!="admin") throw Error();
	})
	const noStudents=req=>getUserFromJWT(req.headers.authorization.split(' ')[1]).then(user=>{
		if(user.blocked) throw Error();
		if(user.functie=="student") throw Error();
	})
	sitemap=()=>{
		return getCategories().then(categories=>Promise.all(categories.map(category=>category.subcatagories.map(sub=>sub.id)).flat())).then(subs=>{
			subUrls=subs.map(category=>`https://fep2.herokuapp.com/category/${category}`)
			return Promise.all(subs.map(sub=>getArticlesByCategory(sub)))
				.then(articles=>articles.flat())
				.then(articles=>articles.map(article=>`https://fep2.herokuapp.com/article/${article}`))
				.then(articleUrls=>[subUrls,articleUrls].flat())
				.then(urls=>urls.join('\n'))
		})
	}
	selector=(queryParts,json,req,res)=>{
		switch(queryParts.shift()) {
			case 'search':
				return search(req.url.split('?')[1])
			case 'register':
				return register(json)
			case 'login':
				return login(json)
			case 'getUser':
				return getUserFromJWT(req.headers.authorization.split(' ')[1]);
			case 'getBookmarks':
				return getBookmarks(req.headers.authorization.split(' ')[1]);
			case 'setBookmarks':
				return setBookmarks(req.headers.authorization.split(' ')[1],json);
			case 'updateUser':
				return adminOnly(req).then(()=>updateUser(queryParts.shift(),json),()=>{return {'err':'no access'}})
			case 'deleteUser':
				return adminOnly(req).then(()=>deleteUser(queryParts.shift()),()=>{return {'err':'no access'}});
			case 'getUsers':
				return adminOnly(req).then(()=>getUsers(),()=>{return {'err':'no access'}});
			case 'getArticle':
				return getArticle(queryParts.join('/'))
			case 'getArticlePreview':
				return getArticlePreview(queryParts.join('/'))
			case 'saveArticle':
				return noStudents(req).then(()=>saveArticle(queryParts.shift(),json),()=>{return {'err':'no access'}});
			case 'getCategory':
				return getCategory(queryParts.shift());
			case 'getCategories':
				return getCategories();
			case 'getArticlesByCategory':
				return getArticlesByCategory(queryParts.shift());
			case 'sitemap.txt':
				return sitemap();
			default:
				return Promise.resolve('no action found!')
		}
	}
})
