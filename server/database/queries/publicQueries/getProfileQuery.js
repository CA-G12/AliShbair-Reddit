const connection = require('../../config/connections');

const getUserPosts = (username) => connection
        .query('select username, img, email, created_at, post, posts.id as post_id, votes_count from posts join users on posts.user_id=users.id and users.username = $1', [username])


module.exports = getUserPosts;