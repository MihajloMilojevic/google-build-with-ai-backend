const { StatusCodes } = require("http-status-codes");
const { getPosts, createPost, getPostById, getCommentsByPostId, createComment } = require("../database/controllers/postsController.js");
const { v4: uuidv4 } = require("uuid");
const errorWrapper = require("../middleware/errorWrapper.js");

async function GetPostsController(req, res) {
    const query = await getPosts();
    if(query.error) {
        throw query.error;
    }
    res.status(StatusCodes.OK).json({ok: true, posts: query.data});
}

async function CreatePostController(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Наслов и садржај су обавезни" });
    }
    const post = {
        id: uuidv4(),
        title,
        content,
        user_id: req?.session?.user?.id || "f096ecc4-6777-40ea-a566-225cf40a96cc",
        created_at: new Date()
    };
    const query = await createPost(post);
    if(query.error) {
        throw query.error;
    }
    res.status(StatusCodes.CREATED).json({ok: true, post});
}

async function GetPostByIdController(req, res) {
    const { id } = req.params;
    const postQuery = await getPostById(id);
    if(postQuery.error) {
        throw postQuery.error;
    }
    if(postQuery.data.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Пост није пронађен" });
    }
    const post = postQuery.data[0];
    const commentsQuery = await getCommentsByPostId(id);
    if(commentsQuery.error) {
        throw commentsQuery.error;
    }
    const comments = commentsQuery.data;
    res.status(StatusCodes.OK).json({ok: true, post: {...post, comments}});
}

async function CreateCommentController(req, res) {
    const { content, post_id, comment_id } = req.body;
    if (!content || !post_id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Садржај и ID поста су обавезни" });
    }
    const comment = {
        id: uuidv4(),
        content,
        post_id,
        comment_id: comment_id || null,
        user_id: req?.session?.user?.id || "f096ecc4-6777-40ea-a566-225cf40a96cc",
        created_at: new Date(),
        name: req?.session?.user?.name || "Mihajlo",
    };
    const query = await createComment(comment);
    if(query.error) {
        throw query.error;
    }
    res.status(StatusCodes.CREATED).json({ok: true, comment});
}

module.exports = {
    GetPostsController: errorWrapper(GetPostsController),
    CreatePostController: errorWrapper(CreatePostController),
    GetPostByIdController: errorWrapper(GetPostByIdController),
    CreateCommentController: errorWrapper(CreateCommentController),
}