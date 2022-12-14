const router = require('express').Router();
const { User, Post, Comment} = require('../../models/index');

// GET api/comments
// probably only need get by post id 
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{model: User}, {model: Post}] 
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET api/comments/:id 
// --- don't need this route

//POST create comment api/comments
router.post('/', async (req, res) => {  
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;