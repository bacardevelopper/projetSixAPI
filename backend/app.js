const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoute = require('./router/routeruser');
const saucesRoute = require('./router/routersauces');

/* create app express */
const app = express();

/* connect dbb mongoose */
mongoose.connect('mongodb+srv://bddDeryos:deryos976@cluster0-it6zi.mongodb.net/bddDeryos?retryWrites=true&w=majority', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex : true
})
/* use promise for work in asynchrone */
.then( () => {
	console.log("connexion in mongoDB  is ok ");
})
.catch( () => {
	console.log('connexion in mongoDB is not ok');
});


/* Headers // CORS # configured by express module */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});


/* parser */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

console.log(" ** hello world fullstack student ** ");


/* global middleware sauces et users*/
app.use('/api/auth', userRoute);
app.use('/api', saucesRoute);


/*****/
module.exports = app;