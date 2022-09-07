const router = require('express').Router();
const createPost = require('../controllers/authControllers.js/createPost');
const submitPost = require('../controllers/authControllers.js/submitPost');
const deletePost = require('../controllers/authControllers.js/deletePost');
const comment = require('../controllers/authControllers.js/comment');
const deleteComment = require('../controllers/authControllers.js/deleteComment');
const votePost = require('../controllers/authControllers.js/votePost');

router.get('/createPost', createPost);
router.post('/submitPost', submitPost);
router.delete('/deletePost', deletePost);
router.post('/comment', comment);
router.post('/deleteComment', deleteComment);
router.post('/votePost', votePost);

module.exports = router;