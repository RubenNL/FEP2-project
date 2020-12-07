const fs=require('fs')
const http=require('http')
let files=fs.readdirSync('wiki/articles');
files=files.map(file=>{
	const fileData=fs.readFileSync(`wiki/articles/${file}`,'utf8');
	const JSONData=JSON.parse(fileData);
	let filenameParts=file.split('.');
	filenameParts.pop();
	const filename=filenameParts.join('.');//split+pop+join zodat 'a.b.c.json'->'a.b.c'
	return {id:filename,title:JSONData.title};
})

http.createServer((req,res)=>{
	res.setHeader('Content-Type', 'application/json');
	const query=req.url.split('/')[3];// /api/search/<query>
	if(!query) res.end('[]');
	if(query.length<1) return;
	let response=files.filter(file=>{
		return file.title.toLowerCase().includes(query.toLowerCase())
		//filteren op lowercase
	});
	res.end(JSON.stringify(response));
}).listen(7999)