const mongoose = require('mongoose');


//create a schema for user
const Schema = mongoose.Schema;
/* model instanciation */
const sauce = new Schema({
	userId : {type : String,  required : true}, 
	name : {type : String,  required : true}, 
	manufacturer : {type: String, required : true}, 
	description : {type: String, required : true}, 
	mainPepper : {type : String, required : true},
	imageUrl : {type : String, required : true}, 
	heat : {type : Number , required : false}, 
	likes : {type : Number , required : false}, 
	dislikes : {type : Number, required : false},
	usersLiked : [],
	usersDisliked :[ ]
});



module.exports = mongoose.model('sauceModel', sauce);
