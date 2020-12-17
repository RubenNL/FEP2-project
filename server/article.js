const {Op}=require('sequelize');
let Article;
getArticle=id=>Article.findByPk(id)
saveArticle=json=>Article.create({
	data:json.data,
	title:json.title
})
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
module.exports=sequelize=>{
	Article=sequelize.models.articles;
	return {getArticle,saveArticle,search}
} 
