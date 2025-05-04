require("dotenv").config();
require("express-async-errors");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const express = require('express');
const server = express();

const path = require('path');

const cors = require('cors');
const loginController = require("./controllers/loginController");
const authentication = require("./middleware/authentication");
const meController = require("./controllers/meController");
const sessionMiddleware = require("./middleware/session");
const registerController = require("./controllers/registerController");
const {GetPostsController, CreatePostController, CreateCommentController, GetPostByIdController} = require("./controllers/postsController");
const port = process.env.PORT || 5000;

server.use(express.static("public"))

server.use(express.json());
// server.set('trust proxy', 1);
// server.use(helmet());
server.use(cors());
// server.use(xss());


server.use(sessionMiddleware)

server.post("/api/login", loginController);
server.post("/api/register", registerController);
server.get("/api/me", authentication, meController);
server.get("/api/posts", 
	authentication, 
	GetPostsController);
server.post("/api/posts", 
	authentication, 
	CreatePostController);
server.get("/api/posts/:id", 
	authentication, 
	GetPostByIdController);
server.post("/api/posts/:id/comments",
	authentication, 
	CreateCommentController);

server.use((req,res) =>{
	res.sendFile(path.join(__dirname+'/public/index.html'));
});

server.use(notFound);
server.use(errorHandler);

const startServer = async () => {
	try {
		server.listen(port, () => console.log(`Server slusa na portu ${port}`))
	} catch (error) {
		console.error(error);
	}
}

startServer();