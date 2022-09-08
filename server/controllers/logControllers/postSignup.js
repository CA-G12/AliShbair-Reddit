const bcrypt = require('bcrypt');
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
    const { email } = req.body;
    getUserByEmail(email)
        .then(existedUser => {
            console.log(!existedUser.rowCount);
            // if (!existedUser) {
            //     console.log('ok store it');
            // } else {
            //     console.log('no, u r here before!');
            // }
        })

};

module.exports = postSignup;