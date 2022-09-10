const connection = require('../../config/connections');

const findPostById = (post_id) => connection.query('select * from posts where posts.id = $1', [post_id]);

const deletePostQuery = (post_id) => connection.query('delete from posts where posts.id = $1', [post_id]);

module.exports = { deletePostQuery, findPostById };