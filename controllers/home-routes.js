const router = require('express').Router();
const { User, Post, Comment} = require('../models');



router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model: User}]
        })
        const posts = postData.map(post => post.get({ plain: true}))
        res.render('homepage', {posts});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    res.render('login');
  });

module.exports = router;