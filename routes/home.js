const express = require('express');
const router = express.Router();

// Now we can use the view engine for below string
router.get('/', (req, res) => {
	res.render('index', { title: 'My Study App', message: 'Hello World' });
});

module.exports = router;