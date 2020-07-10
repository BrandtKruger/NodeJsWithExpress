// Custom middleware function to authenticate
function authenticate(req, res, next) {
	console.log('Authenticating...');
	next;
};

module.exports = authenticate;
