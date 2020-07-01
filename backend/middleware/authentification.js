const jwt = require('jsonwebtoken');


//module exportable authentification
module.exports = (req, res, next) => {
	try{

	}catch(error){
		res.status(401).json({error : error | 'requete non authentifiée'});
	}
}