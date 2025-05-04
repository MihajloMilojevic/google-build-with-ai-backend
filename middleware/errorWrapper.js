const errorHandler = require("./errorHandler");

module.exports = function errorWrapper(cb) {
	return async function(req, res, next) {
		try {
			await cb(req, res, next);
		} catch (error) {
			errorHandler(error, req, res);
		}
	}
}