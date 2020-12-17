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
		}
	});
	User.sync({ force: true });
	const Article=sequelize.define("articles",{
		id: {
			primaryKey: true,
			type:DataTypes.INTEGER,
			autoIncrement:true
		},
		title: DataTypes.STRING,
		data: DataTypes.STRING(32768)
	});
	Article.sync({ force: true });
}
