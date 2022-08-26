const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// GET api/posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model: User}, {model: Comment}]
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET api/posts/:id 
router.get('/:id', async (req, res) => {
    
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{model: User}, {model: Comment}]

        })
        if (!postData){
            res.status(400).json({message: 'No post found with that id'})
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;