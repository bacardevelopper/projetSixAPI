const multer = require('multer');
const modelSauce = require('../model/sauceModel');

exports.addaSauce = (req, res, next) => {
	if(req.body){
		console.log(req.body);	
	}
}