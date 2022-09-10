const commentQuery = require('../../database/queries/authQueries/commentQuery');
const { validateComment } = require('../../utils/validate');
const ExtendedError = require('../../utils/ExtendedError');

const comment = (req, res, next) => {
    const { comment } = req.body;
    const user_id = req.user.id
    const post_id = req.params.id;
    console.log('REQ INFO TO CHECK:', user_id, post_id, comment);
    commentQuery({ comment, user_id, post_id })
        .then(() => res.json({ msg: 'Comment added successfully' }))
        .catch(err => next(err))
};

module.exports = comment;
