const { getUserByUsername, getUserByEmail } = require("../database/controllers/userController");
const Errors = require("../errors");
const  errorWrapper = require("../middleware/errorWrapper");
const bcrypt = require("bcryptjs");
const {StatusCodes} = require("http-status-codes");

async function LoginController(req, res){
    const {email, password} = req.body;
	if(!email) throw new Errors.BadRequestError("Email је обавезан.");
	if(!password) throw new Errors.BadRequestError("Лозинка је обавезна.");
	let queryResult = await getUserByEmail(email);
	if(queryResult.error) throw queryResult.error;
	const user = queryResult.data[0];
	if(!user) throw new Errors.NotFoundError("Корисник не постоји");
	const iste = await bcrypt.compare(password, user.password);
	if(!iste) throw new Errors.BadRequestError("Погрешна лозинка");
	req.session.user = {
		id: user.id,
        email: user.email,
        name: user.name,
	};
	await req.session.save();
	res.status(StatusCodes.OK).json({ok: true, user: req.session.user})
}

module.exports = errorWrapper(LoginController);