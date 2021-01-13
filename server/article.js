const removeMd = require('remove-markdown');
const {Op}=require('sequelize');
let Article;
getArticle=id=>Article.findByPk(id)
getArticlePreview=id=>{
	return getArticle(id).then(article=>JSON.parse(JSON.stringify(article))).then(article=>{
		article.preview=removeMd(article.data.split('\n',1)[0])
		delete article.data
		if(article.preview.length>40) article.preview=article.preview.substring(0,40)+'...'
		return article
	})
}
saveArticle=(id,json,user)=>{
	if(user) json.lastEditedBy=user.fullName;
	if(id) return Article.update(json,{where:{id:id}})
	else return Article.create(json)
}
search=query=>new Promise((resolve,reject)=>{
	if(!query) {
		resolve([])
		return;
	}
	if(query.length==0) {
		resolve([])
		return;
	}
	const isSqlite=Article.sequelize.options.dialect=="sqlite";
	resolve(Article.findAll({
		where: {
			title: {
				[isSqlite?Op.substring:Op.iLike]: isSqlite?`${query}`:`%${query}%`
			},
			categoryId: {
				[Op.not]: 1688148667
			}
		}
	}));
})
getArticlesByCategory=categoryId=>Article.findAll({
	where: {
		categoryId: categoryId
	},
	attributes: ['id']
}).then(articles=>articles.map(article=>article.id))
module.exports=sequelize=>{
	Article=sequelize.models.articles;
	JSON.parse(require('fs').readFileSync('initialArticles.json','utf8')).forEach(article=>saveArticle(null,article))
	return {getArticle,saveArticle,search,getArticlesByCategory,getArticlePreview}
} 
