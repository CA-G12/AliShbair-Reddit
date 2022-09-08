const bcrypt = require('bcrypt');
const getUserByEmail = require('../../database/queries/logQueries/getUserByEmail');

const postSignin = (req, res) => {
    console.log('postSignin');
    console.log(req.body);

};

module.exports = postSignin;

