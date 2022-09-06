const router = require('express').Router();

router.get('/createPost');
router.post('/submitPost');
router.delete('/deletePost');
router.post('/comment');
router.post('/deleteComment');
router.post('/votePost');

module.exports = router;