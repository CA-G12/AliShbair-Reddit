const router = require('express').Router();
const postSignup = require('../controllers/logControllers/postSignup');
const postSignin = require('../controllers/logControllers/postSignin');
const signout = require('../controllers/logControllers/signout');
const verifyToken = require('../utils/verifyToken');
const greetUser = require('../controllers/logControllers/greetUser');

router.get('/greet', verifyToken, greetUser);
router.post('/signup', postSignup);
router.post('/signin', postSignin);
router.get('/signout', signout);

module.exports = router;
