const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// GET api/posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
           
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;