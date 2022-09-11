const signout = (req, res) => {
    res.clearCookie('jwt');
    res.end();
};

module.exports = signout;