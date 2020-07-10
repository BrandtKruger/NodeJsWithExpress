const express = require('express');
const coursesRouter = express.Router();

const courses = [
	{ id: 1, name: 'Course 1' },
	{ id: 2, name: 'Course 2' },
	{ id: 3, name: 'Course 3' },
	{ id: 4, name: 'Course 4' },
];

coursesRouter.get('/', (req, res) => {
	res.send(courses);
});

coursesRouter.get('/:id', (req, res) => {
	const course = lookUpCourse(req.params.id)
	if (!course)
		return res.status(404).send(`The course requested with ID ${req.params.id} was not found.`);
	res.send(course);
});

coursesRouter.post('/', (req, res) => {

	const { error } = validateCourse(req.body);
	if (error) {
		return res.status(400).send(result.error.details[0].message);
	};

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};

	courses.push(course);
	res.send(course);
});

coursesRouter.put('/:id', (req, res) => {
	// Lookup course
	const course = lookUpCourse(req.params.id)
	if (!course)
		return res.status(404).send(`The course requested with ID ${req.params.id} was not found.`);

	const { error } = validateCourse(req.body);
	if (error) {
		return res.status(400).send(result.error.details[0].message);
	};

	// Update course
	course.name = req.body.name;
	res.send(course);

});

coursesRouter.delete('/:id', (req, res) => {
	// Lookup
	const course = lookUpCourse(req.params.id)
	if (!course)
		return res.status(404).send(`The course requested with ID ${req.params.id} was not found.`);

	// Delete
	const index = courses.indexOf(course);
	courses.splice(index, 1);
	res.send(course);
});

function validateCourse(course) {
	// Validate
	const schema = {
		name: Joi.string().min(3).required()
	};

	return result = Joi.validate(course, schema);
}

function lookUpCourse(id) {
	return courses.find(c => c.id === parseInt(id));
}

module.exports = coursesRouter;