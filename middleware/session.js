const { getIronSession } = require('iron-session');

const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: "SID",
  ttl: 2 * 60 * 60,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: false,
    httpOnly: true,
    // sameSite: "none"    // <--- This disables SameSite completely
  },
};


module.exports = async function (req, res, next) {
  const session = await getIronSession(req, res, sessionOptions);
  req.session = session;
  next();
}