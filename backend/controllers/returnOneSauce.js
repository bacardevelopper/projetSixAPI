const modelSauce = require('../model/sauceModel');

exports.oneSauce = (req, res, next) => {
	modelSauce.findOne({_id : req.params.id}, (err, docs) => {
		if(!err){
			res.status(200).json(docs);
		}else{
			
		}
	});	
}