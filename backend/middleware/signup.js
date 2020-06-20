const Thing = require('../userModel');
const express = require('express');

/* the function for inscription user */
exports.createUser = (req, res, next) => {
	//
	res.status(200);
	res.json({un : "un"});
	console.log('reussit middleware');
	res.end();
};