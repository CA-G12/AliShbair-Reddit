const bcrypt = require('bcrypt');
const postSignupQuery = require('../../database/queries/logQuerie/postSignupQuery');

const postSignup = (req, res) => {
    console.log('postSignup');
    console.log(req.body);
    res.send('you signed up!!')
};

module.exports = postSignup;