const router = require('express').Router();
const getHome = require('../controllers/publicControllers/getHome');
const getProfile = require('../controllers/publicControllers/getProfile');
const searchPost = require('../controllers/publicControllers/searchPost');

router.get('/home', getHome);
router.get('/profile', getProfile );
router.get('/searchPost', searchPost)

module.exports = router;