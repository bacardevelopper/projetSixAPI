const mongoose = require('mongoose');

/* module for validate unique mail  */
const uniqueValidator = require('mongoose-unique-validator');

//create a schema for user
const Schema = mongoose.Schema;

/* model */
const user = new Schema({
	email : {type : String, min : 4, unique : true, required : true} ,
	password : {type : String, min : 4, required : true}
});


/*this plugin verify that email adress is unique */
user.plugin(uniqueValidator);

module.exports = mongoose.model('userModel', user);
