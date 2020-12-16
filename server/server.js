const http=require('http')
const { Sequelize, Model, DataTypes } = require('sequelize');
const fs=require('fs')

const sequelize = new Sequelize(process.env.DATABASE_URL?process.env.DATABASE_URL:'sqlite::memory:');
const User=sequelize.define("users",{
	email: {primaryKey: true, type:DataTypes.STRING},
	hash: DataTypes.STRING,
	fullName: DataTypes.STRING,
	functie: DataTypes.STRING,
	orgName: DataTypes.STRING,
	blocked: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}	
});
User.sync({ force: true });
const Article=sequelize.define("articles",{
	id: {
		primaryKey: true,
		type:DataTypes.INTEGER,
		autoIncrement:true
	},
	title: DataTypes.STRING,
	data: DataTypes.STRING(32768)
});
Article.sync({ force: true });

const {register,login,getUsername} = require('./loginsignup.js')(sequelize)
const {getArticle,saveArticle,search} = require('./article.js')(sequelize)
setTimeout(()=>JSON.parse(fs.readFileSync('initialArticles.json','utf8')).forEach(saveArticle),1000)

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
		console.log(queryParts);
		switch(queryParts.shift()) {
			case 'search':
				search(req.url.split('?')[1]).then(res.endJson);
				break;
			case 'register':
				register(json).then(res.endJson);
				break;
			case 'login':
				login(json).then(res.endJson);
				break;
			case 'getUsername':
				getUsername(req.headers.authorization.split(' ')[1]).then(res.endJson);
				break;
			case 'getArticle':
				getArticle(queryParts.join('/')).then(res.endJson);
				break;
			case 'saveArticle':
				saveArticle(json).then(res.endJson);
				break;
			default:
				res.end('no action found!')
				return;
		}
	})
}).listen(7999)
