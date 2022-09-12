const { commentQuery, getDetailedComment } = require('../../database/queries/authQueries/commentQuery');
const { validateComment } = require('../../utils/validate');

const comment = (req, res, next) => {
    const { comment } = req.body;
    const user_id = req.user.id
    const post_id = req.params.id;
    return commentQuery({ comment, user_id, post_id })
        .then(submittedComment => getDetailedComment(submittedComment.rows[0].id))
        .then((detailedComment) => res.json({ msg: 'Comment added successfully', comment: detailedComment.rows[0] }))
        .catch(err => next(err))
};

module.exports = comment;
