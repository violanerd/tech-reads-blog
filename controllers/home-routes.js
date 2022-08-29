const router = require('express').Router();
const { User, Post, Comment} = require('../models');
//const withAuth = require('../utils/withAuth')


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
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');

  });
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/post/:id', async(req,res) => { // added withauth here to test
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    attributes:['id', 'comment_text','post_id', 'user_id', 'createdAt' ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {model: User} ]

        })
        if (!postData){
            res.status(400).json({message: 'No post found with that id'})
            return;
        }
        const post = postData.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn})
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;