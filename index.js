
const logInfo = require('debug')('app:info');
const logError = require('debug')('app:error');
const logWarning = require('debug')('app:warning');
const config = require('config');
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticating = require('./middleware/authenticate');
const courses = require('./routes/courses');
const datetime = require('./routes/datetime');
const home = require('./routes/home');
const express = require('express');
const helmet = require('helmet'); // Third Party middleware
const morgan = require('morgan');
const app = express();

// Set view engine with template engine to re-format data to dynamic html data
app.set('view engine', 'pug');
app.set('views', './views'); // default - optional


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// use third party middleware
app.use(helmet());

// Any route that start with / use home router
app.use('/', home);

// Any route that start with /api/courses use courses
app.use('/api/courses', courses);

// Any route that start with /api/post/date use datetime
app.use('/api/post/date', datetime);

// Configuration
logInfo('Application Name: ' + config.get('name'))
logInfo('Mail Server: ' + config.get('mail.host'))
logInfo('Mail Password: ' + config.get('mail.password'))

if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	logInfo('Morgan enabled...');
}

// Middleware function
app.use(express.json());

// middleware function
app.use(express.urlencoded()); // key=value&key=value - Old way

// Static
app.use(express.static('public'));

// call custom middlware function for logging
app.use(logger);

// call custom middlware function for Autheticating
app.use(authenticating);

