const router = require('express').Router();
const getAllPostsSorted = require('../controllers/publicControllers/getAllPostsSorted');
const getProfile = require('../controllers/publicControllers/getProfile');
const searchPost = require('../controllers/publicControllers/searchPost');

router.get('/home', getAllPostsSorted);
router.get('/profile', getProfile);
router.get('/searchPost', searchPost)

module.exports = router;