const connection = require('../../config/connections');

const getAllPostsQuery = () => connection.query('select username, img, created_at, post, votes_count from posts join users on posts.user_id=users.id');

module.exports = getAllPostsQuery;

