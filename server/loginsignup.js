var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const secret=process.env.JWT_SECRET?process.env.JWT_SECRET:'asdiojasdfijasdof' //gebruik de secret van heroku, als die beschikbaar is. anders deze random string.
let User;
function hash(password) {
	var salt = bcrypt.genSaltSync(10);
	return bcrypt.hashSync(password, salt);
}
function checkPassword(hash,password) {
	return bcrypt.compareSync(password, hash);
}

register=data=>{
	data.hash=hash(data.password)
	delete data.password;
	return User.create(data).then(jane=>jane.toJSON()).catch(err=>{
		console.log(err);
		return {err:"failed to create user"}
	})
};
login=data=>{
	return User.findOne({where:{email:data.email}}).then(jane=>{
		if(jane==null) return {err:'User does not exist!'};
		else return checkPassword(jane.hash,data.password)?{key:jwt.sign({ email: jane.email }, secret)}:{err:'Wachtwoord incorrect!'}
	})
};
getUser=email=>User.findByPk(email)
getUsername=key=>{
	return new Promise((resolve,reject)=>{
		jwt.verify(key,secret,(err,decoded)=>{
			if(err) resolve({err:err})
			resolve(decoded.email)
		})
	}).then(getUser).then(user=>user.email)
}
module.exports=sequelize=>{
	User=sequelize.models.users;
	return {register,login,getUsername}
}
