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
    try {
        const userData = await User.findOne({
            where: { id: req.params.id },
            //attributes: {exclude: ['password']},
            //include: [{Post}]
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
module.exports = router;