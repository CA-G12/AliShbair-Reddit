const connection = require('../../config/connections');

const getUserByEmail = (email) => {
    console.log('getUserByEmail');
    return connection.query(`SELECT * FROM users where email='${email}'`);
}
module.exports = getUserByEmail;