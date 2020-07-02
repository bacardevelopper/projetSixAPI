const express = require('express');
const auth = require('../middleware/authentification');
const fonctionAdd = require('../controllers/addsauce');

/* la methide router permet de creer des routes express */
const routersauces = express.Router();
/* importer middleware d'inscription */

routersauces.post('/', fonctionAdd.addSauce);


module.exports = routersauces;