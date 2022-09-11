const { getPostCommentsQuery } = require('../../database/queries/publicQueries/getAllPostsQuery');

const getPostComments = (req, res, next) => {
    getPostCommentsQuery(req.params.post_id)
        .then(postComments => res.json(postComments.rows))
        .catch(err => next(err))
}

module.exports = getPostComments;