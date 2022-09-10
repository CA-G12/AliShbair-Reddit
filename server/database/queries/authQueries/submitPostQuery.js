const connection = require('../../config/connections');

const submitPostQuery = ({ post, user_id }) => connection
    .query('INSERT INTO posts (post, user_id, votes_count) VALUES($1, $2, $3)', [post, user_id, 0]);


module.exports = submitPostQuery;