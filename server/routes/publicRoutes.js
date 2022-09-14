const router = require('express').Router();
const getAllPostsSorted = require('../controllers/publicControllers/getAllPostsSorted');
const getProfile = require('../controllers/publicControllers/getProfile');
const searchPost = require('../controllers/publicControllers/searchPost');
const getPostComments = require('../controllers/publicControllers/getPostComments')

router.get('/home', getAllPostsSorted);
router.get('/getComments/:post_id', getPostComments);
router.get('/profile/:username', getProfile);
router.get('/searchPost', searchPost)

module.exports = router;