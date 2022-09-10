const router = require('express').Router();
const submitPost = require('../controllers/authControllers.js/submitPost');
const deletePost = require('../controllers/authControllers.js/deletePost');
const comment = require('../controllers/authControllers.js/comment');
const deleteComment = require('../controllers/authControllers.js/deleteComment');
const votePost = require('../controllers/authControllers.js/votePost');
const verifyToken = require('../utils/verifyToken');

router.post('/submitPost', verifyToken ,submitPost);
router.delete('/deletePost/:id', verifyToken, deletePost);
router.post('/comment/:id', verifyToken, comment);
router.delete('/deleteComment/:id', deleteComment);
router.get('/votePost', votePost);

module.exports = router;