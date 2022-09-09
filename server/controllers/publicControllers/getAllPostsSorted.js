const getAllPosts = require('../../database/queries/publicQueries/getHomeQuery');

const getAllPostsSorted = (req, res) => {
    console.log('getAllPostsSorted');
    getAllPosts()
        .then(posts => {
            const sortedPosts = posts.rows.sort((a, b) => b.votes_count - a.votes_count);
            res.json(sortedPosts)
        })
};

module.exports = getAllPostsSorted;