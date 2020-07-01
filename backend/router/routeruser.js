const express = require('express');

/* la methide router permet de creer des routes express */
const routeruser = express.Router();
/* importer middleware d'inscription */
const signup = require('../controllers/signup');
const login = require('../controllers/signin');


routeruser.post('/signup', signup.createUser);
routeruser.post('/login', login.loginUser);


module.exports = routeruser;