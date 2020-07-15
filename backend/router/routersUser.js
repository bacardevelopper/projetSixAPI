const express = require('express');
const fctId = require('../controllers/controllersId');

const myrouterUsers = express.Router();

myrouterUsers.post('/signup', fctId.createUser);
myrouterUsers.post('/login', fctId.loginUser);



module.exports = myrouterUsers;
