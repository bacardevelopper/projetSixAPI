/* modules used */
const jwt = require('jsonwebtoken');

/* module export function verify token authentification */
module.exports = (req, res, next) => {
	try{
		const token = req.headers.authorization.split(' ')[1];
		const verificationtoken = jwt.verify(token, 'TOKEN_IS_FREE_OPEN_SOURCE');
		const userId = verificationtoken.userId;

		
		if(req.body.userId && req.body.userId !== userId){
			throw 'user id no valable';
		}else{
			next();
		}

	}catch(error){
		res.status(401).json({error : error | 'requete non authentifiée'});
	}
}