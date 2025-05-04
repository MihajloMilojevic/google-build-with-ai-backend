const { getUserByUsername, changeUserPassword, createUser } = require("../database/controllers/userController");
const Errors = require("../errors");
const  errorWrapper = require("../middleware/errorWrapper");
const bcrypt = require("bcryptjs");
const StatusCodes = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");

async function RegisterController(req, res){
	const {username, email, name, password} = req.body;
    if(!email) throw new Errors.BadRequestError("Email је обавезан.");
    if(!name) throw new Errors.BadRequestError("Име је обавезно.");
    if(!password) throw new Errors.BadRequestError("Лозинка је обавезна.");
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    queryResult = await createUser(id, email, name, hashedPassword);
    if(queryResult.error) throw queryResult.error;
    const user = {
        id: id,
        email: email,
        name: name,
        password: hashedPassword
    }
    req.session.user = user;
    await req.session.save();
    res.status(StatusCodes.OK).json({ok: true, user: {
        id: user.id,
        email: user.email,
        name: user.name,
    }});
}

module.exports = errorWrapper(RegisterController);