const getAllPostsQuery = require('../../database/queries/publicQueries/getAllPostsQuery');

const getAllPostsSorted = (req, res) => {
    console.log('getAllPostsSorted');
    getAllPostsQuery()
        .then(posts => {
            const sortedPosts = posts.rows.sort((a, b) => b.votes_count - a.votes_count);
            console.log(sortedPosts);
            res.json(sortedPosts)
        })
        .catch(err => console.log(err))
};

module.exports = getAllPostsSorted;