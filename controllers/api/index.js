const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const CommentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/comments', CommentRoutes);
router.use('/posts', postRoutes);

module.exports = router;