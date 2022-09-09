const jwt = require('jsonwebtoken');
const ExtendedError = require('./ExtendedError');
require('env2')('.env');

module.exports = verifyToken = (req, res, next) => {
    try {
        console.log('verifyToken');
        const validToken = req.cookies.jwt;
        if (!validToken) throw new ExtendedError('You are not authorized!', 400);
        else console.log('validToken::', validToken);
        jwt.verify(validToken, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('sorry, token is manipulated!');
                // res.end();
                throw new ExtendedError('Token is being manipulated!', 400);

            } else {
                console.log('DECODED INFO:', decoded);
                req.userEmail = decoded.email;
                next();
            }
        })
    }
    catch (err) {
        next(err)
    }
};
