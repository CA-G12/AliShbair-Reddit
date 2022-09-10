const submitPostQuery = require('../../database/queries/authQueries/submitPostQuery');
const { validatePost } = require('../../utils/validate');
const ExtendedError = require('../../utils/ExtendedError');

const submitPost = (req, res, next) => {
    try {
        const { error } = validatePost(req.body);
        if (error) throw new ExtendedError(error.details[0].message, 400);
        submitPostQuery({ post: req.body.post, user_id: req.user.id })
            .then(() => res.json({ msg: 'Post added successfully' }))
            .catch(err => next(err))
    } catch (err) {
        next(err);
    }
};

module.exports = submitPost;