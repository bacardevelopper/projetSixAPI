const express = require('express');
const auth = require('../middleware/middleAuth');
const fctSauces = require('../controllers/controllersSauces');
const multer = require('../middleware/middleStorage');

const muyRouterSauces = express.Router();

muyRouterSauces.post('/sauces', auth, multer, fctSauces.addSauce);
muyRouterSauces.get('/sauces/:id', auth, fctSauces.oneSauce);
muyRouterSauces.get('/sauces', auth, multer, fctSauces.returnAll);
muyRouterSauces.put('/sauces/:id', auth, multer, fctSauces.modifySauce);
muyRouterSauces.delete('/sauces/:id', auth, fctSauces.deleteOne);
muyRouterSauces.post('/sauces/:id/like', auth, fctSauces.likeAndDislike);



module.exports = muyRouterSauces;