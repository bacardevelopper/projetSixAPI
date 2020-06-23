const express = require('express');

/* la methide router permet de creer des routes express */
const router = express.Router();
/* importer middleware d'inscription */
const signup = require('./middleware/signup');
router.post('/signup', signup.createUser);
/* router.get('/login', login.connectUser); */

module.exports = router;