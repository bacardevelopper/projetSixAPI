const express = require('express');
const auth = require('../middleware/authentification');
const fonctionAdd = require('../controllers/addsauce');
const multer = require('../middleware/uploaderAlgo');
/* la methide router permet de creer des routes express */
const routersauces = express.Router();
/* importer middleware d'inscription */

routersauces.post('/sauces', multer, fonctionAdd.addSauce);


module.exports = routersauces;