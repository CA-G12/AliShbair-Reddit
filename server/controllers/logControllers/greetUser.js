
const greetUser = (req, res) => {
    console.log('greetUser');
    console.log('Edited Req Obj with email:', req.userEmail);
    res.json({ email: req.userEmail })
};

module.exports = greetUser;