const submitPostQuery = require('../../database/queries/authQueries/submitPostQuery');
const { getDetailedPost }  = require('../../database/queries/publicQueries/getAllPostsQuery');
const { validatePost } = require('../../utils/validate');
const ExtendedError = require('../../utils/ExtendedError');

const submitPost = (req, res, next) => {
    try {
        const { error } = validatePost(req.body);
        if (error) throw new ExtendedError(error.details[0].message, 400);
         return submitPostQuery({ post: req.body.post, user_id: req.user.id })
             .then((submittedPost) => getDetailedPost(submittedPost.rows[0].id, req.user.id))
             .then((DetailedPost) => res.json({ msg: 'Post added successfully', post: DetailedPost.rows[0] }))
        .catch(err => next(err))
    } catch (err) {
        next(err);
    }
};

module.exports = submitPost;

             
