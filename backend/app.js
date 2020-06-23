const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./router');


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

/* create app express */
const app = express();

/* Headers // CORS # configured by express module */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, ContentType, Authorization');
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

console.log("allo");

/* parser */
app.use(express.json());
app.use(express.urlencoded( {extended : true} ));

/* global middleware */
app.use('/api/auth', userRoute); 

/*****/
module.exports = app;