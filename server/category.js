const {Op}=require('sequelize');
let Category;
addCategory=(head,sub,subid)=>{
	Category.create({
		id:subid,
		headcatagory:head,
		name:sub
	})
}
getCategories=()=>{
	return Category.findAll({
		where: {
			id: {
				[Op.not]: 1688148667
			}
		}
	}).then(data=>{
		categories={};
		([...new Set(data.map(item=>item.headcatagory))]).forEach(category=>categories[category]={headcatagory:category,subcatagories:[]})
		data.forEach(row=>categories[row.headcatagory].subcatagories.push({title:row.name,id:row.id}))
		return Object.values(categories)
	})
}
getCategory=id=>{
	return Category.findByPk(id);
}
module.exports=sequelize=>{
	Category=sequelize.models.categories;
	JSON.parse(require('fs').readFileSync('menuSource.json','utf8')).forEach(menuItem=>{
		menuItem.subcatagories.forEach(sub=>addCategory(menuItem.headcatagory,sub.title,sub.id))
	})
	return {addCategory,getCategories,getCategory}
}
