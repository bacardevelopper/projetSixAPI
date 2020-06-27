const mongoose = require('mongoose');


//create a schema for user
const Schema = mongoose.Schema;
/* model instanciation */
const sauce = new Schema({
	id : {type : String, required : true} ,
	userId : {type : String,  required : true},
	name : {type : String,  required : true},
	manufacturer : {type: String, required : true},
	description : {type: String, required : true},
	maniPepper : {type : String, required : true},
	imageUrl : {type : String, required : true},
	heat : {type : Number , required : true},
	likes : {type : Number , required : true},
	dislikes : {type : Number, required : true},
	usersLiked : [],
	usersDisliked :[ /* array */]
});



module.exports = mongoose.model('sauceModel', sauce);
