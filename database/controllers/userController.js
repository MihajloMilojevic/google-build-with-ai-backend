const query = require("../query");


async function getUserByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const params = [email];
    return await query({ sql, params });
}

async function getUserById(id) {
    const sql = `SELECT * FROM users WHERE id = ?`;
    const params = [id];
    return await query({ sql, params });
}

async function changeUserPassword(username, password) {
    const sql = `UPDATE users SET password = ? WHERE username = ?`;
    const params = [password, username];
    return await query({ sql, params });
}

async function createUser(id, email, name, password) {
    const sql = `INSERT INTO users (id, email, name, password) VALUES (?, ?, ?, ?)`;
    const params = [id, email, name, password];
    return await query({ sql, params });
}

module.exports = {
    getUserByEmail,
    getUserById,
    changeUserPassword,
    createUser,
};