const { StatusCodes } = require('http-status-codes')

module.exports = (err, req, res, next) => {
	let error = {
		// set default
		statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
		msg: err.message || "An error has occurred. Please try again later.",
	}
	
	console.trace(err);
	return res.status(error.statusCode).json({ ok: false, message: error.msg})
  }