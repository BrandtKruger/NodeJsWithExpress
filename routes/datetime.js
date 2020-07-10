const express = require('express');
const dateRouter = express.Router();

dateRouter.get('/:year/:month', (req, res) => {
	res.send(req.params);
});

dateRouter.get('/:year/:month', (req, res) => {
	res.send(req.query);
});

module.exports = dateRouter;
