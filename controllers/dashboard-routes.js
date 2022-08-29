const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');


// code to render all the single user posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: [{model: User}]
        })
        const posts = postData.map(post => post.get({ plain: true}))
        res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
        res.status(500).json(err);
    }

  });

// create a new post
router.get('/new', (req, res) => {
    res.render('new-post', { loggedIn: true });
})


module.exports = router;