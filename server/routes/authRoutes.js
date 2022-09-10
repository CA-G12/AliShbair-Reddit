const router = require('express').Router();
const createPost = require('../controllers/authControllers.js/createPost');
const submitPost = require('../controllers/authControllers.js/submitPost');
const deletePost = require('../controllers/authControllers.js/deletePost');
const comment = require('../controllers/authControllers.js/comment');
const deleteComment = require('../controllers/authControllers.js/deleteComment');
const votePost = require('../controllers/authControllers.js/votePost');
const verifyToken = require('../utils/verifyToken');

router.get('/createPost', createPost);
router.post('/submitPost', verifyToken ,submitPost);
router.delete('/deletePost/:d', deletePost);
router.post('/comment', comment);
router.delete('/deleteComment/:id', deleteComment);
router.get('/votePost', votePost);

module.exports = router;