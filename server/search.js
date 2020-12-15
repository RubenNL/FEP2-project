const { Op } = require("sequelize");
let Article;
search=query=>new Promise((resolve,reject)=>{
	if(query.length==0) {
		resolve([])
		return;
	}
	resolve(Article.findAll({
		where: {
			title: {
				[Op.substring]: query
			}
		}
	}));
})
module.exports=sequelize=>{
	Article=sequelize.models.articles;
	return {search}
}
