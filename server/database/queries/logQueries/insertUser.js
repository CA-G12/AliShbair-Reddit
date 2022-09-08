const connection = require('../../config/connections');

const insertUser = (user) => {
    console.log('insertUser', user);
    return connection.query(
        'insert into users (username, email, password) values ($1, $2, $3) returning *;',
        [user.username, user.email, user.password],
    );
}

module.exports = insertUser;

