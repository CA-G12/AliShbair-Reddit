const bcrypt = require('bcrypt');
const postSigninQuery = require('../../database/queries/logQuerie/postSigninQuery');

const postSignin = (req, res) => {
    console.log('postSignin');
    console.log(req.body);
    res.send('you signed up!!')
};

module.exports = postSignin;

