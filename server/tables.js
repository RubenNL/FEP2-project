const { DataTypes } = require('sequelize');
module.exports=sequelize=>{
	const User=sequelize.define("users",{
		email: {primaryKey: true, type:DataTypes.STRING},
		hash: DataTypes.STRING,
		fullName: DataTypes.STRING,
		functie: DataTypes.STRING,
		orgName: DataTypes.STRING,
		blocked: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		},
		bookmarks: {
			type: DataTypes.STRING,
			defaultValue: ''
		}
	});
	const Article=sequelize.define("articles",{
		id: {
			primaryKey: true,
			type:DataTypes.INTEGER,
			autoIncrement:true
		},
		title: DataTypes.STRING,
		data: DataTypes.STRING(32768)
	});
	const Category=sequelize.define("categories",{
		id: {
			primaryKey: true,
			type:DataTypes.INTEGER,
			autoIncrement:true
		},
		name: DataTypes.STRING,
		headcatagory: DataTypes.STRING
	});
	Category.hasMany(Article);
	Article.belongsTo(Category);
	return sequelize.sync() //{force:true} om alles te verwijderen
}
