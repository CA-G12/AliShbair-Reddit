const getSignup = (req, res) => {
    console.log('getSignup');
    res.sendFile(join(__dirname, '..', 'client', 'html', 'signup.html'));
};

module.exports = getSignup;