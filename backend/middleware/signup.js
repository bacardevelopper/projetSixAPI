const Thing = require('../userModel');
const express = require('express');

/* the function for inscription user */
exports.createUser = (req, res, next) => {
	//write first middleware for signup
	res.status(200);
	console.log('reussit middleware');
	res.json(req.body.email);
	res.end();
}