const mongoose = require('mongoose');
/* package for validate unique mail  */
const uniqueValidator = require('mongoose-unique-validator');

//create a schema for user
const Schema = mongoose.Schema;

/* model instanciation */
const user = new Schema({
	email : {type : String, min : 4, required : true} ,
	password : {type : String, min : 4, required : true}
});


/*verify that email adress is unique */
user.plugin(uniqueValidator);

module.exports = mongoose.model('userModel', user);
