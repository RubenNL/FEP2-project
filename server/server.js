var bcrypt = require('bcrypt');
const fs=require('fs')
const http=require('http')
const { DbClient } = require('pg');

const dbClient= new DbClient({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false
	}
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
	if (err) throw err;
	for (let row of res.rows) {
		console.log(JSON.stringify(row));
	}
	client.end();
});

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
		res.setHeader('Content-Type', 'application/json');
		const queryParts=req.url.split('/');
		queryParts.shift();
		switch(queryParts.shift()) {
			case 'search':
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
				logins[json.username]=hash(json.password)
				res.end('ok')
				break;
			case 'login':
				res.end(checkPassword(logins[json.username],json.password)?'ja':'nee')
				break;
			default:
				res.end('no action found!')
				return;
		}
	})
}).listen(7999)
