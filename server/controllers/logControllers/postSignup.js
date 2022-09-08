const { hash } = require('bcrypt');
const insertUser = require('../../database/queries/logQueries/insertUser');
const getUserByEmail = require('../../database/queries/logQueries/getUserByEmail');
const { validateSignup } = require('../../utils/validate');
const ExtendedError = require('../../utils/ExtendedError')

const postSignup = (req, res) => {
    console.log('postSignup');
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
                console.log('so, ur here before!');
                throw new ExtendedError('Email already Exists!', 400);
            };
            console.log('ok, ur not existed, lets hash and store u');
            return hash(req.body.password, 10);
        })
        .then(hashedPassword => {
            console.log('after hashed:', hashedPassword);
            const { username, email } = req.body;
            insertUser({ username, email, password: hashedPassword })
        })
        .then(user => {
            console.log('user stored and returned successfully:', user.rows[0]);
        })
        .catch(err => next(err))

};

module.exports = postSignup;