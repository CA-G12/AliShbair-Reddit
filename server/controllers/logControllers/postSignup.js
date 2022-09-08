const bcrypt = require('bcrypt');
const postSignupQuery = require('../../database/queries/logQueries/postSignupQuery')
const { validateSignup } = require('../../utils/validate');
const ExtendedError = require('../../utils/ExtendedError')

const postSignup = (req, res) => {
    console.log('postSignup is working');

    const { error } = validateSignup(req.body);
    if (error) {
        if (error.details.length > 1) {
            const manyErrors = error.details.map(err => err.message).join();
            throw new ExtendedError(manyErrors, 400);
        } else {
            throw new ExtendedError(error.details[0].message, 400);
        }
    }
    return req.body;
};

module.exports = postSignup;