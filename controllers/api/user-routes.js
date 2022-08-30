const router = require('express').Router();
const { User, Post, Comment} = require('../../models');

// GET api/users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {exclude: ['password']}
        })
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET api/users/:id 
router.get('/:id', async (req, res) => {
    
    try {
        const userData = await User.findByPk(req.params.id, {
            //attributes: {exclude: ['password']},
            include: [{model: Post}, {model: Comment}]

        })
                
        if (!userData){
            res.status(400).json({message: 'No user found with that id'})
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new user api/users
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        // req session stuff here
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.status(200).json({user: userData, message: "You are signed up!"})
        })
    } catch (err) {
        res.status(500).json(err);
    }
});
// LOGIN /api/users/login
router.post('/login', async (req, res) =>{
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            },
        })
        if(!userData){
            res.status(400).json({message: "No user found with this username"})
            return;
        }
        const validPassword = userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: "Incorrect password"})
            return;
        }
        // req.session stuff here
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.status(200).json({user: userData, message: "You are logged in!"})
        })
    } catch (err){
        res.status(500).json(err);
    }
})

// LOGOUT
router.post('/logout', (req, res) => {
    if (req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
})


module.exports = router;