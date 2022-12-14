const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models/index');
const withAuth = require('../utils/withAuth')

// code to render all the single user posts
// /dashboard/
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {user_id: req.session.user_id},
            include: [{model: User}]
        })
        const posts = postData.map(post => post.get({ plain: true}))
        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }

  });

// edit a post /dashboard/edit/:id
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {})
        if(!postData){
            res.status(400).json({message: "No post found"})
            return;
        }
        const post = postData.get({ plain: true });
        res.render('edit-post', {post, loggedIn: req.session.loggedIn})
    } catch (err) {
        res.status(500).json(err)
    }
})

// create a new post /dashboard/new
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', { loggedIn: req.session.loggedIn });
})


module.exports = router;