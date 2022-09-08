const bcrypt = require('bcrypt');
const getUserByEmail = require('../../database/queries/logQueries/getUserByEmail');

const postSignin = (req, res) => {
    console.log('postSignin');
    console.log(req.body);
    postSigninQuery()
        .then(data => console.log('DB Users:', data.rows[1].username))
        .catch(err => console.log(err))
    res.send('you signed in!!')
};

module.exports = postSignin;

