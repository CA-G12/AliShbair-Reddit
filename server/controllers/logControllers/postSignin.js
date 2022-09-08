const bcrypt = require('bcrypt');
const getUserByEmail = require('../../database/queries/logQueries/getUserByEmail');
const { validateSignin } = require('../../utils/validate');
const ExtendedError = require('../../utils/ExtendedError');
const generateToken = require('../../utils/generateToken');

const postSignin = (req, res, next) => {
    console.log('postSignin');
    console.log(req.body);
    try {
        const { error } = validateSignin(req.body);
        if (error) {
            if (error.details.length > 1) {
                const manyErrors = error.details.map(err => err.message).join();
                throw new ExtendedError(manyErrors, 400);
            } else {
                throw new ExtendedError(error.details[0].message, 400);
            }
        }
        console.log('Validated signin yeah', req.body);
    } catch (err) {
        console.log('Catched Error:', err);
        next(err)
    }
};

module.exports = postSignin;

