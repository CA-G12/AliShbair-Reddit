const { hash } = require('bcrypt');
const insertUser = require('../../database/queries/logQueries/insertUser');
const getUserByEmail = require('../../database/queries/logQueries/getUserByEmail');
const { validateSignup } = require('../../utils/validate');
const ExtendedError = require('../../utils/ExtendedError');
const generateToken = require('../../utils/generateToken');

const postSignup = (req, res, next) => {
    console.log('postSignup');
    try {
        const { error } = validateSignup(req.body);
        if (error) {
            if (error.details.length > 1) {
                const manyErrors = error.details.map(err => err.message).join();
                throw new ExtendedError(manyErrors, 400);
            } else {
                throw new ExtendedError(error.details[0].message, 400);
            }
        }
        getUserByEmail(req.body.email)
            .then(existedUser => {
                if (existedUser.rowCount) {
                    throw new ExtendedError('Email already Exists!', 400);
                }
                return hash(req.body.password, 10);
            })
            .then(hashedPassword => {
                const { username, email } = req.body;
                return insertUser({ username, email, password: hashedPassword })
            })
            .then(user => {
                const { username, id } = user.rows[0];
                generateToken(res, { username, id });
            })
            .catch(err => next(err))
    } 
    catch (err) {
        next(err)
    }
}; 

module.exports = postSignup;