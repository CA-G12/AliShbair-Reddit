
const greetUser = (req, res) => {
    console.log('greetUser');
    console.log('Edited Req Obj username:', req.user.username);
    res.json({ username: req.user.username, id: req.user.id })
};

module.exports = greetUser;