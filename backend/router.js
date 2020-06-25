const express = require('express');

/* la methide router permet de creer des routes express */
const router = express.Router();
/* importer middleware d'inscription */
const signup = require('./middleware/signup');
const login = require('./middleware/signin');
router.post('/signup', signup.createUser);
router.post('/login', login.loginUser);

module.exports = router;