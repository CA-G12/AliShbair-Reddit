const { getPostCommentsQuery } = require('../../database/queries/publicQueries/getAllPostsQuery');

// const extendedSortedPosts = sortedPosts.map(post => {
//     return getPostCommentsQuery(post.post_id)

const getPostComments = (req, res) => {
    console.log('getPostComments');
    console.log(req.params.post_id);
    getPostCommentsQuery(req.params.post_id)
        .then(postComments => res.json(postComments.rows))
        .catch(err => console.log(err))
}

module.exports = getPostComments;