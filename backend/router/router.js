const express = require('express');

/* la methide router permet de creer des routes express */
const router = express.Router();
/* importer middleware d'inscription */
const signup = require('../controllers/signup');
const login = require('../controllers/signin');
const returnArray = require('../controllers/return');

router.post('/signup', signup.createUser);
router.post('/login', login.loginUser);
router.get('/sauces', returnArray.returnArraySauces);

module.exports = router;