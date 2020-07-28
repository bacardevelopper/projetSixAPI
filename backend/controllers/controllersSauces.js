/* modules used */
const modelSauce = require('../model/sauceModel');
const fs = require('fs');
/* modules used */


/* model de fonction exportable */
/*
exports.data = (req, res, next) => {
}
*/
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

	//methode save data in DB (mongodb)
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
exports.deleteOne = (req, res, next) => {
	modelSauce.deleteOne({_id : req.params.id}, (err, docs) => {
		if(!err){
			res.status(200).json({message : 'la sauce a bien été supprimé'});
			console.log('suppression de la sauce');
		}else{
			console.log('ça na pas marché');
		}
	});
}

/* function return all sauce in bdd */
exports.returnAll = (req, res, next) => {
	modelSauce.find({}, (err, docs) => {
		if(!err){
			res.status(200).json(docs);
			console.log('renvoit tous les sauces');
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

//function modify a sauce
exports.modifySauce = (req, res, next) => {
	const sauceMdf = req.file ?
		{
			...req.body,
			imageUrl : `${req.protocol}://${req.get('host')}/uploadfiles/${req.file.filename}`
		}
		: {...req.body}

	modelSauce.findOne({ _id : req.params.id} , (err, docs) => {
		if(!err){
			console.log(sauceMdf);
			/* operateur spread */
			modelSauce.updateOne({_id : req.params.id}, {...sauceMdf, _id : req.params.id})
				.then( () => {
					console.log('enr° ok');
					res.status(200).json({message : 'enr° ok'});
				})
				.catch( () => {
					console.log('enr° not ok');
					res.status(400).json({error});
				});
		}
	});
}



exports.likeAndDislike = (req, res, next) => {
	let dataCompare = req.body;
	/* id de la sauce */
	let idCompare = req.params.id;
	
	/* */
	modelSauce.findOne({ _id : idCompare},(err, docs) => {
		if(!err){
			let docsTabLiked = docs.usersLiked;
			let docsTabDisLiked = docs.usersDisliked;

			for(let i = 0; i <= docsTabLiked.length; i++){
				/* verifier que l'id n'est pas present dans l'array */
				if(dataCompare.userId !== docs.usersLiked[i]){
					console.log(docsTabLiked);
					console.log(docsTabLiked[0]);
					console.log(docsTabLiked);
				}else{
					console.log('erreur au niveau boucle condition');
				}
			}

			console.log(idCompare);


		}else{
			console.log(err);
		}
	});
}
