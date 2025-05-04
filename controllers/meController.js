const  errorWrapper = require("../middleware/errorWrapper");
const StatusCodes = require("http-status-codes");

async function MeController(req, res){
	res.status(StatusCodes.OK).json({ok: true, user: req.session.user})
}

module.exports = errorWrapper(MeController);
