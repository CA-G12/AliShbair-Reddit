const jwt = require('jsonwebtoken');
const ExtendedError = require('./ExtendedError');
require('env2')('.env');

module.exports = verifyToken = (req, res, next) => {
    try {
        console.log('verifyToken');
        const existedToken = req.cookies.jwt;
        if (!existedToken) throw new ExtendedError('You are not authorized!', 400);
        jwt.verify(existedToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('sorry, token is manipulated!');
                throw new ExtendedError('Token is being manipulated!', 400);

            } else {
                console.log('DECODED INFO:', decoded);
                req.user = decoded;
                next();
            }
        })
    }
    catch (err) {
        next(err)
    }
};
