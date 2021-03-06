var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const secret=process.env.JWT_SECRET?process.env.JWT_SECRET:'asdiojasdfijasdof' //gebruik de secret van heroku, als die beschikbaar is. anders deze random string.
let User;
function hash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
function checkPassword(hash,password) {
	return bcrypt.compareSync(password, hash);
}

register=data=>{
	data.hash=hash(data.password)
	delete data.password;
	return User.create(data).then(jane=>{return {}}).catch(err=>{
		console.log(err);
		return {err:"Account bestaat al!"}
	})
};
login=data=>{
	return getUser(data.email).then(jane=>{
		if(jane==null) return {err:'User does not exist!'};
		if(jane.blocked) return {err:'User is blocked!'}
		else return checkPassword(jane.hash,data.password)?{key:jwt.sign({ email: jane.email,fullName:jane.fullName,functie:jane.functie }, secret)}:{err:'Wachtwoord incorrect!'}
	})
};
getUser=email=>User.findByPk(email)
getUserFromJWT=key=>{
	return new Promise((resolve,reject)=>{
		jwt.verify(key,secret,(err,decoded)=>{
			if(err) reject({err:err})
			resolve(decoded.email)
		})
	}).then(getUser).then(user=>user.toJSON())
}
getUsers=()=>User.findAll();
updateUser=(email,changes)=>User.update(changes,{where:{email:email}})
deleteUser=email=>User.destroy({where:{email:email}})
getBookmarks=key=>getUserFromJWT(key).then(user=>JSON.parse(user.bookmarks))
setBookmarks=(key,bookmarks)=>getUserFromJWT(key).then(user=>User.update({bookmarks:JSON.stringify(bookmarks)},{where:{email:user.email}}))
module.exports=sequelize=>{
	User=sequelize.models.users;
	JSON.parse(require('fs').readFileSync('initialUsers.json','utf8')).forEach(user=>User.create(user))
	return {register,login,getUserFromJWT,getUsers,updateUser,deleteUser}
}
