const router = require('express').Router();
const getSignup = require('../controllers/logControllers/getSignup');
const getSignin = require('../controllers/logControllers/getSignin');
const postSignup = require('../controllers/logControllers/postSignup');
const postSignin = require('../controllers/logControllers/postSignin');
const signout = require('../controllers/logControllers/signout');

router.get('/signup', getSignup);
router.get('/signin', getSignin);
router.post('/signup', postSignup);
router.post('/signin', postSignin);
router.get('/signout', signout);

module.exports = router;
