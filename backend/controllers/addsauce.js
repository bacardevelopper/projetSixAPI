const modelSauce = require('../model/sauceModel');

exports.addSauce = (req, res, next) => {
	console.log(req.body.sauce);
	console.log(req.file.originalname);
}
