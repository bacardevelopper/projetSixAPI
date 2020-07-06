const modelSauce = require('../model/sauceModel');

exports.returnAll = (req, res, next) => {
	modelSauce.find({}, (err, docs) => {
		if(!err){
			res.status(200).json(docs);
			console.log(docs);	
		}
	});
}