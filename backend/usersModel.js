const mongoose = require('mongoose');
//attribution Schema propriety
const Schema = mongoose.Schema;

const users = new Schema({
    email : {type : String, required : true},
    password : {type : String, required : true}
});

//access model and exports
const UsersModel = mongoose.model('UsersModels', users);
module.exports = UsersModel;