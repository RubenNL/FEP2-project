const {Op}=require('sequelize');
let Article;
getArticle=id=>Article.findByPk(id)
saveArticle=json=>Article.create(json)
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
			}
		}
	}));
})
getArticlesByCategory=categoryId=>Article.findAll({
	where: {
		categoryId: categoryId
	},
	attributes: ['id','title']
})
module.exports=sequelize=>{
	Article=sequelize.models.articles;
	JSON.parse(require('fs').readFileSync('initialArticles.json','utf8')).forEach(saveArticle)
	return {getArticle,saveArticle,search,getArticlesByCategory}
} 
