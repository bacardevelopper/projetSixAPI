const express = require('express');
/* la methide router permet de creer des routes express */
const router = express.Router();
/* importer middleware d'inscription */
const signup = require('./middleware/signup');
router.get('/signup', signup.createUser);

module.exports = router;