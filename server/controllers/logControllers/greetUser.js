
const greetUser = (req, res) => {
    return res.json({ username: req.user.username, id: req.user.id })
};

module.exports = greetUser;