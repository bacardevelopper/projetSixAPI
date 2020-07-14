const express = require('express');
const auth = require('../middleware/authentification');
const fctAdd = require('../controllers/addsauce');
const multer = require('../middleware/uploaderAlgo');
const fctDeleteOne = require('../controllers/deleteOne');
const fctReturnAll = require('../controllers/returnallsauces');

/* la methide router permet de creer des routes express */
const routersauces = express.Router();
/* importer middleware d'inscription */

routersauces.post('/sauces', auth, multer, fctAdd.addSauce);
routersauces.get('/sauces/:id', auth, multer, fctDeleteOne.deleteUn);
routersauces.get('/sauces', auth, multer, fctReturnAll.returnAll);

<<<<<<< HEAD


=======
>>>>>>> parent of a65b69c... message en cours de resolution de l'erreur 404 upload file
module.exports = routersauces;