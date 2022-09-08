const jwt = require('jsonwebtoken');
require('env2')('.env');
const ExtendedError = require('./ExtendedError')

module.exports = generateToken = (res, payload) => {
    console.log('generateToken');
    jwt.sign(payload, process.env.SECRET_KEY, { algorithm: 'HS256' }, (err, token) => {
        if (err) {
            throw new ExtendedError(err, 401);
        } else {
            res.cookie('jwt', token).send('Token saved');
        }
    });
};