const multer = require('multer');
const ModelSauce = require('../model/sauceModel');

exports.returnArraySauces = (req, res, next) => {
	res.status(200)
		.json({
			message : 'ok le middle de recup tab sauces'
		});
  
}
