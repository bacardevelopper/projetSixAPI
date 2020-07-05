const mongoose = require('mongoose');


//create a schema for user
const Schema = mongoose.Schema;
/* model instanciation */
const sauce = new Schema({
	userId : {type : String,  required : true}, /* l'identifiant de l'user */
	name : {type : String,  required : true}, /* nom de la sauce */
	manufacturer : {type: String, required : true}, /* nom du fabricant */
	description : {type: String, required : true}, /* description de la sauce */
	mainPepper : {type : String, required : true}, /* principal ingredient e la sauce */
	imageUrl : {type : String, required : true}, /* lien de l'url */
	heat : {type : Number , required : false}, /* note de la sauce */
	likes : {type : Number , required : false}, 
	dislikes : {type : Number, required : false},
	usersLiked : [/* array */ ],
	usersDisliked :[ /* array */]
});



module.exports = mongoose.model('sauceModel', sauce);
