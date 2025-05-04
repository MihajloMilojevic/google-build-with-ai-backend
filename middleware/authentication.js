const { getUserById } = require("../database/controllers/userController");
const  errorWrapper = require("./errorWrapper");
const Errors = require("../errors");

module.exports =  errorWrapper(
	async function (req, res, next) {
		const session = req.session;
		if(!session) throw new Errors.UnauthenticatedError("Session not found.");
		if(!session.user) throw new Errors.UnauthenticatedError("User not found.");
		const id = session.user.id;
		const {error, data} = await getUserById(id);
		if(error || data.length === 0) throw new Errors.UnauthenticatedError("User not found.");
		const user = {
			id: data[0].id,
			username: data[0].username,
			email: data[0].email,
			name: data[0].name,
			image: data[0].image
		};
		session.user = user;
		await session.save();
		next();
	}
)
  


// export default function auth(req) {
//   const session = req.session;
//   if(!session.user) return null;
//   return session.user;
// }
