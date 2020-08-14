/* modules used */
const jwt = require('jsonwebtoken');

/* module export function very token authentification */
module.exports = (req, res, next) => {
	try{
		const token = req.headers.authorization.split(' ')[1];
		const verificationtoken = jwt.verify(token, 'TOKEN_IS_FREE_OPEN_SOURCE');
		const userId = verificationtoken.userId;

		/* si userId (client) existe et qu'il est different de userId (decoder) */
		if(req.body.userId && req.body.userId !== userId){
			throw 'user id non valable';
		}else{
			next();
		}

	}catch(error){
		res.status(401).json({error : error | 'requete non authentifiée'});
	}
}