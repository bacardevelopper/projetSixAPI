const Thing = require('../userModel');
const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../userModel');
const mongoose = require('mongoose');
/*                                   */

const saltRounds = 10;

/* the function for inscription user */
exports.createUser = (req, res, next) => {

	res.status(200);
	console.log('reussit middleware');
	if(req.body.email !== "" && req.body.mdp !== ""){

		bcrypt.hash(req.body.mdp, saltRounds, (err, hash) => {
		console.log(hash);
		});

	}else{
		console.log("error");	
	}

	res.end();
}