const {StatusCodes} = require("http-status-codes");

module.exports = function(req, res) {
    return res.status(StatusCodes.NOT_FOUND).json({ok: false, message: "Route does not exist"});
}