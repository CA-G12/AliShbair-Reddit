const { getAllPostsQuery } = require('../../database/queries/publicQueries/getAllPostsQuery');

const getAllPostsSorted = (req, res) => {
    console.log('getAllPostsSorted');
    getAllPostsQuery()
        .then(posts => {
            const sortedPosts = posts.rows.sort((a, b) => b.votes_count - a.votes_count);
            res.json(sortedPosts);
        })
        .catch(err => console.log(err));
};



// const getAllPostsSorted = (req, res) => {
//     getAllPostsQuery()
//         .then(posts => {
//             const sortedPosts = posts.rows.sort((a, b) => b.votes_count - a.votes_count);
//             const postsWithComments = sortedPosts.map(post => {
//                 return getPostCommentsQuery(post.post_id)
//                     .then(postComments => post.comments = postComments.rows)
//             })
//         .then(postsWithComments => console.log(postsWithComments))
//         })
//         .catch(err => console.log(err));
// };

module.exports = getAllPostsSorted  ;

