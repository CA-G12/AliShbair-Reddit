const router = require('express').Router();
//logRoutes
const getSignupRouter = require('./logRoutes');
const getSigninRouter = require('./logRoutes');
const postSignupRouter = require('./logRoutes');
const postSigninRouter = require('./logRoutes');
const signoutRouter = require('./logRoutes');
//publicRoutes
const getHomeRouter = require('./publicRoutes');
const getProfileRouter = require('./publicRoutes');
const searchPostRouter = require('./publicRoutes');
//authRoutes
const createPostRouter = require('./authRoutes');
const submitPostRouter = require('./authRoutes');
const deletePostRouter = require('./authRoutes');
const commentRouter = require('./authRoutes');
const deleteCommentRouter = require('./authRoutes');
const votePostRouter = require('./authRoutes');

router.use(getSignupRouter);
router.use(getSigninRouter);
router.use(postSignupRouter);
router.use(postSigninRouter);
router.use(signoutRouter);

router.use(getHomeRouter);
router.use(getProfileRouter);
router.use(searchPostRouter);

router.use(createPostRouter);
router.use(submitPostRouter);
router.use(deletePostRouter);
router.use(commentRouter);
router.use(deleteCommentRouter);
router.use(votePostRouter);

module.exports = router;
