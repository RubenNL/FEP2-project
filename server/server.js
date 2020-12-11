var bcrypt = require('bcrypt');
const fs=require('fs')
const http=require('http')
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL?process.env.DATABASE_URL:'sqlite::memory:');

const User=sequelize.define("users",{
	username: {primaryKey: true, type:DataTypes.STRING},
	hash: DataTypes.STRING
});
User.sync({ force: true });
let files=fs.readdirSync('wiki/articles');
let logins={}
files=files.map(file=>{
	const fileData=fs.readFileSync(`wiki/articles/${file}`,'utf8');
	const JSONData=JSON.parse(fileData);
	let filenameParts=file.split('.');
	filenameParts.pop();
	const filename=filenameParts.join('.');//split+pop+join zodat 'a.b.c.json'->'a.b.c'
	return {id:filename,title:JSONData.title};
})

function hash(password) {
	var salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
}
function checkPassword(hash,password) {
	return bcrypt.compareSync(password, hash);
}
http.createServer((req,res)=>{
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
		const queryParts=req.url.split('/');
		queryParts.shift();
		if(queryParts[0]=="api") queryParts.shift();
		console.log(queryParts);
		switch(queryParts.shift()) {
			case 'search':
				res.setHeader('Content-Type', 'application/json');
				query=queryParts.join('/');
				if(!query) res.end('[]');
				if(query.length<1) return;
				let response=files.filter(file=>{
					return file.title.toLowerCase().includes(query.toLowerCase())
					//filteren op lowercase
				});
				res.end(JSON.stringify(response));
				break;
			case 'register':
				(async () => {
					const jane = await User.create({
						username: json.username,
						hash: hash(json.password)
					});
					res.end(JSON.stringify(jane.toJSON()));
				})();
				break;
			case 'login':
				(async () => {
					const jane = await User.findByPk(json.username);
					if(jane==null) res.end('user does not exist!');
					else res.end(checkPassword(jane.hash,json.password)?'ja':'nee')
				})();
				break;
			default:
				res.end('no action found!')
				return;
		}
	})
}).listen(7999)
