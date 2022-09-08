const jwt = require('jsonwebtoken');
require('env2')('.env');

module.exports = verifyToken = (req, res, next) => {
    console.log('verifyToken');
    const validToken = req.cookies.jwt;
    if (!validToken) res.redirect('/signin');
    else console.log('validToken::', validToken);
    jwt.verify(validToken, process.env.SECRET_KEY, (err, decoded) => {
        if (err) console.log(' sorry, token is manipulated!');
        console.log('DECODED INFO:', decoded);
        // req.userEmail = decoded.email;
        next();
    })
};
