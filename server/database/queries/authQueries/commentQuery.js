const connection = require('../../config/connections');

const commentQuery = ({ comment, user_id, post_id }) => connection
    .query('INSERT INTO comments (comment, post_id, user_id) VALUES($1, $2, $3) returning *', [comment, post_id, user_id]);

const getDetailedComment = (comment_id) => connection
    .query(`select username, comment, created_at, comments.id as comment_id from comments join users on comments.user_id=users.id where  comments.id = $1`, [comment_id]);


module.exports = { commentQuery, getDetailedComment } ;