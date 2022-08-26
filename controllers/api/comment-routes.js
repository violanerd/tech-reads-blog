const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

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
//will I need this? 
router.get('/:id', async (req, res) => {
    
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{model: User}, {model: Post}]

        })
        if (!commentData){
            res.status(400).json({message: 'No comment found with that id'})
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;