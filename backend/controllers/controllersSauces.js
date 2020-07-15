/* modules used */
const modelSauce = require('../model/sauceModel');
/* modules used */



/* function add a sauce in bdd */
exports.addSauce = (req, res, next) => {
	
	const dataInsert = JSON.parse(req.body.sauce);

	console.log(dataInsert);
	console.log(dataInsert.name);

	const like = 0;
	const dislike = 0;
	const tabUserLike = [];
	const tabUserDislike = [];
	
	const sauceAdd = new modelSauce(
		{
			userId : dataInsert.userId, 
			name : dataInsert.name, 
			manufacturer : dataInsert.manufacturer,
			description : dataInsert.description, 
			mainPepper : dataInsert.mainPepper, 
			imageUrl : `${req.protocol}://${req.get('host')}/uploadfiles/${req.file.filename}`,
			heat : dataInsert.heat, 
			likes : like, 
			dislikes : dislike,
			usersLiked : tabUserLike,
			usersDisliked : tabUserDislike
		}
	);

	
	sauceAdd.save( (err) => {
		if(!err){
			res.status(201).json({message : 'insert in bdd succes'});
			console.log('succes');
		}else{
			console.log('not save');
		}
	});
	
	
	
}

/* function delete sauce in bdd */
/* delete , /api/sauces/:id , {message : 'suppression reussi */
exports.deleteUn = (req, res, next) => {

}

/* function return all sauce in bdd */
exports.returnAll = (req, res, next) => {
	modelSauce.find({}, (err, docs) => {
		if(!err){
			res.status(200).json(docs);
			console.log(docs);	
		}
	});
}


/* function return one sauce with _id */
exports.oneSauce = (req, res, next) => {
	modelSauce.findOne({_id : req.params.id}, (err, docs) => {
		if(!err){
			res.status(200).json(docs);
		}else{
			
		}
	});	
}
