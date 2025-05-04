const query = require("../query");


async function getPosts() {
    sql = "SELECT p.id, u.name, p.title, p.created_at FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC";
    const result = await query({sql});
    return result;
}

async function createPost(post) {
    const sql = "INSERT INTO posts (id, title, content, user_id, created_at) VALUES (?, ?, ?, ?, ?)";
    const params = [post.id, post.title, post.content, post.user_id, post.created_at];
    const result = await query({sql, params});
    return result;
}

async function getPostById(id) {
    const sql = "SELECT p.*, u.name FROM posts p JOIN users u ON p.user_id = u.id WHERE p.id = ?";
    const params = [id];
    const result = await query({sql, params});
    return result;
}

async function getCommentsByPostId(postId) {
    const sql = "SELECT c.*, u.name FROM comments c JOIN users u ON c.user_id = u.id WHERE c.post_id = ? ORDER BY c.created_at DESC";
    const params = [postId];
    const result = await query({sql, params});
    return result;
}

async function createComment(comment) {
    const sql = "INSERT INTO comments (id, content, post_id, user_id, created_at, comment_id) VALUES (?, ?, ?, ?, ?, ?)";
    const params = [comment.id, comment.content, comment.post_id, comment.user_id, comment.created_at, comment.comment_id];
    const result = await query({sql, params});
    return result;
}

module.exports = {
    getPosts,
    createPost,
    getPostById,
    getCommentsByPostId,
    createComment,
}