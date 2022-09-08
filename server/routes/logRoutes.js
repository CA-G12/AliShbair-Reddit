const router = require('express').Router();
const postSignup = require('../controllers/logControllers/postSignup');
const postSignin = require('../controllers/logControllers/postSignin');
const signout = require('../controllers/logControllers/signout');

router.post('/signup', postSignup);
router.post('/signin', postSignin);
router.get('/signout', signout);

module.exports = router;
