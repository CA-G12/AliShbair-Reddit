const { getPostCommentsQuery } = require('../../database/queries/publicQueries/getAllPostsQuery');

const getPostComments = (req, res) => {
    getPostCommentsQuery(req.params.post_id)
        .then(postComments => res.json(postComments.rows))
        .catch(err => console.log(err))
}

module.exports = getPostComments;