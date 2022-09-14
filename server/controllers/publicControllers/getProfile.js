const getUserPosts = require('../../database/queries/publicQueries/getProfileQuery');
const getPostCommentsQuery = require('../../database/queries/publicQueries/getAllPostsQuery');

const getProfile = (req, res, next) => {
    const { username } = req.params;
    return getUserPosts(username)
        .then(userPosts => res.json(userPosts.rows))
        .catch(err => next(err))
    
};

module.exports = getProfile;