const express = require('express');
const auth = require('../middleware/middleAuth');
const fctSauces = require('../controllers/controllersSauces');
const multer = require('../middleware/middleStorage');

const muyRouterSauces = express.Router();


muyRouterSauces.post('/sauces', auth, multer, fctSauces.addSauce);
muyRouterSauces.get('/sauces/:id', auth, fctSauces.oneSauce);
muyRouterSauces.get('/sauces', auth, multer, fctSauces.returnAll);



module.exports = muyRouterSauces;