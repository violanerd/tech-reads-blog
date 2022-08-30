const router = require('express').Router();
const { User, Post, Comment} = require('../../models/index');

// //GET post by user_id in dashboard


//GET post by postid api/posts/:id 
router.get('/:id', async (req, res) => {
    
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{model: User},] 

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


// POST create new post /api/posts
router.post('/', async (req,res) => {
    try{
        const postData = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.user_id
            
        })
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

//PUT update post /api/posts/1
router.put('/:id', async (req,res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            post_content: req.body.post_content},
            {where: {id: req.params.id}
        })
        if(!postData){
            res.status(400).json({message: 'No post found'})
            return;
        }
        res.status(200).json(postData)        
    } catch(err) {
        res.status(500).json(err);
    }
})

//DELETE post /api/post/1
router.delete('/:id', async (req,res) => {
    try {
        const postData = await Post.destroy({
            where: {id: req.params.id}
            })
        if (!postData) {
            res.status(400).json({message: 'No post found'})
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;