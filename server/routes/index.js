const router = require('express').Router();

const logRouter = require('./logRoutes');
const publicRouter = require('./publicRoutes');
const authRouter = require('./authRoutes');

router.use(logRouter);
router.use(publicRouter);
router.use(authRouter);

module.exports = router;


