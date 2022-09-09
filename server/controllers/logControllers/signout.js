const signout = (req, res) => {
    console.log('signout');
    res.clearCookie('jwt');
    res.end();
};

module.exports = signout;