const { deletePostQuery, findPostById } = require('../../database/queries/authQueries/deletePostQuery');
const ExtendedError = require('../../utils/ExtendedError');

const deletePost = (req, res, next) => {
    const post_id = req.params.id;
    const user_id = req.user.id
    findPostById(post_id)
        .then((post) => {
            if (post.rows[0].user_id === user_id) {
                return (deletePostQuery(post_id))
            } else {
                throw new ExtendedError(`You can't delete other's posts!`, 401)
            }
        })
        .then(() => res.json({ msg: 'Post deleted' }))
        .catch(err => next(err))
};

module.exports = deletePost;