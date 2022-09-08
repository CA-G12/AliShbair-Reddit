const jwt = require('jsonwebtoken');
require('env2')('.env');

module.exports = verifyToken = (req, res, next) => {
    console.log('verifyToken');
    const validToken = req.cookies.jwt;
    console.log('validToken::', validToken);
    if (!validToken) console.log('No validToken');


    next();

};

