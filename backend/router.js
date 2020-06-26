const express = require('express');

/* la methide router permet de creer des routes express */
const router = express.Router();
/* importer middleware d'inscription */
const signup = require('./middleware/signup');
const login = require('./middleware/signin');
const returnArray = require('./middleware/return');

router.post('/signup', signup.createUser);
router.post('/login', login.loginUser);
router.get('/sauces', returnArray.returnArraySauces);

module.exports = router;