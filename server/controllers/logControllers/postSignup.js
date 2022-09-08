const bcrypt = require('bcrypt');
const postSignupQuery = require('../../database/queries/logQueries/postSignupQuery');

const postSignup = (req, res) => {
    console.log('signup is working');
    res.sendStatus(200);

};

module.exports = postSignup;