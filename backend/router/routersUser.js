/* modules used */
const express = require('express');
const fctId = require('../controllers/controllersId');
/* modules used */

const myrouterUsers = express.Router();

/* use method post for login and signup */
myrouterUsers.post('/signup', fctId.createUser);
myrouterUsers.post('/login', fctId.loginUser);



module.exports = myrouterUsers;
