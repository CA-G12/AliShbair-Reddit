const router = require('express').Router();

router.get('/signup');
router.get('/signin');
router.post('/signup');
router.post('/signin');
router.get('/signout');

module.exports = router;
