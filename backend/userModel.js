const mongoose = require('mongoose');
/* package for validate unique mail  */
const uniqueValidator = require('mongoose-unique-validator');

//create a schema for user
const user = mongoose.Schema({
	email : {type : String, required : true, unique : true},
	password : {type : String, required : true}
});

/*verify that email adress is unique */
user.plugin(uniqueValidator);

module.exports = mongoose.model('userModel', user);
