const submitPostQuery = require('../../database/queries/authQueries/submitPostQuery');
const getUserByEmail = require('../../database/queries/logQueries/getUserByEmail');
const { validatePost } = require('../../utils/validate');
const ExtendedError = require('../../utils/ExtendedError');

const submitPost = (req, res, next) => {
    try {
        console.log('submitPost');
        const { error } = validatePost(req.body);
        if (error) throw new ExtendedError(error.details[0].message, 400);
        console.log('Validated submit post yeah', req.body);
    } catch (err) {
        next(err);
    }

    

};

module.exports = submitPost;