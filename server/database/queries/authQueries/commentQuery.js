const connection = require('../../config/connections');

const commentQuery = ({ comment, user_id, post_id }) => connection
    .query('INSERT INTO comments (comment, post_id, user_id) VALUES($1, $2, $3)', [comment, post_id, user_id]);

module.exports = commentQuery;