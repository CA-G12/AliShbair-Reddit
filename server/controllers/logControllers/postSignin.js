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

        getUserByEmail(req.body.email)
            .then(existedUser => {
                if (!existedUser.rowCount) {
                    console.log('u have nothing here');
                    throw new ExtendedError('Email is not found!', 401);
                }
                console.log('yes, ur email is found');
                return bcrypt.compare(req.body.password, existedUser.rows[0].password);
            })
            .then(validPassword => {
                if (!validPassword) throw new ExtendedError('Invalid Password!', 401);
                console.log('yes hashes are same', validPassword);
                return getUserByEmail(req.body.email)
            })
            .then(user => {
                console.log('user queried again to send full paylod:', user.rows[0]);
                const { username, id } = user.rows[0];
                generateToken(res, { username, id });
            })
            .catch(err => next(err))
    } catch (err) {
        console.log('Catched Error:', err);
        next(err);
    }
};

module.exports = postSignin;

