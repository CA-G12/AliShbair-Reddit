const connection = require('../../config/connections');

const findCommentById = (comment_id) => connection.query('select * from comments where comments.id = $1', [comment_id]);

const deleteCommentQuery = (comment_id) => connection.query('delete from comments where comments.id = $1', [comment_id]);

module.exports = { deleteCommentQuery, findCommentById };