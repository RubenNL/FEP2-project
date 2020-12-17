let Category;
setTimeout(()=>JSON.parse(require('fs').readFileSync('menuSource.json','utf8')).forEach(menuItem=>{
	menuItem.subcatagories.forEach(sub=>addCategory(menuItem.headcatagory,sub.title,sub.id))
}),500)
addCategory=(head,sub,subid)=>{
	Category.create({
		id:subid,
		headcatagory:head,
		name:sub
	})
}
getCategories=()=>{
	return Category.findAll().then(data=>{
		categories={};
		([...new Set(data.map(item=>item.headcatagory))]).forEach(category=>categories[category]={headcatagory:category,subcatagories:[]})
		data.forEach(row=>categories[row.headcatagory].subcatagories.push({title:row.name,id:row.id}))
		return Object.values(categories)
	})
}
module.exports=sequelize=>{
	Category=sequelize.models.categories;
	return {addCategory,getCategories}
}