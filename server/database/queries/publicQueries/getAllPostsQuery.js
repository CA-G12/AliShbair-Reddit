const connection = require('../../config/connections');

const getAllPostsQuery = () => connection.query('select username, img, created_at, post, posts.id as post_id, votes_count from posts join users on posts.user_id=users.id');

const getPostCommentsQuery = (post_id) => connection.query(`select * from comments where post_id = ${post_id}`);

module.exports = { getAllPostsQuery, getPostCommentsQuery };

