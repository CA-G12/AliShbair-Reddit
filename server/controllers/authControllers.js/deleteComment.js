const { deleteCommentQuery, findCommentById } = require('../../database/queries/authQueries/deleteCommentQuery');
const ExtendedError = require('../../utils/ExtendedError');

const deleteComment = (req, res, next) => {
    const comment_id = req.params.id;
    const user_id = req.user.id
    console.log('YESS1', comment_id, user_id);

    findCommentById(comment_id)
        .then((comment) => {
            if (comment.rows[0].user_id === user_id) {
                return (deleteCommentQuery(comment_id))
            } else {
                throw new ExtendedError(`You can't delete other's comments!`, 401)
            }
        })
        .then(() => res.json({ msg: 'Comment deleted' }))
        .catch(err => next(err))
};

module.exports = deleteComment;