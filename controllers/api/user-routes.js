const router = require('express').Router();
const { User, Post, Comment} = require('../../models');
//const withAuth = require('../../utils/authguard');

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
    console.log(req.params.id)
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
router.post('/', async (req, res) => {})

// LOGIN /api/users/login
router.post('/login', async (req, res) =>{})

// LOGOUT
// router.post('/logout', (req, res) => {
//     if (req.session.loggedIn){
//         req.session.destroy(() => {
//             res.status(204).end();
//         })
//     } else {
//         res.status(404).end();
//     }
// })


module.exports = router;