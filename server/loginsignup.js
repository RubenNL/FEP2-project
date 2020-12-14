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
	return User.create({
		username: data.username,
		hash: hash(data.password)
	}).then(jane=>jane.toJSON());
};
login=data=>{
	return User.findByPk(data.username).then(jane=>{
		if(jane==null) return {err:'User does not exist!'};
		else return checkPassword(jane.hash,data.password)?{key:jwt.sign({ username: jane.username }, secret)}:{err:'Wachtwoord incorrect!'}
	})
};
getUsername=key=>{
	return new Promise((resolve,reject)=>{
		jwt.verify(key,secret,(err,decoded)=>{
			if(err) resolve({err:err})
			resolve(decoded.username)
		})
	})
}
module.exports=sequelize=>{
	User=sequelize.models.users;
	return {register,login,getUsername}
}
