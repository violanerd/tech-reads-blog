const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

const userdata = [
    {
        username: "Bobby",
        password: "12345"
    },
    {
        username: "Ellie",
        password: "12345"
    },
    {
        username: "Alice",
        password: "12345"
    }
];
const commentdata = [
    {
        comment_text: "A sticky situation",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Hmm I wonder if you tried anything different?",
        user_id: 2,
        post_id: 1
    },
    {
        comment_text: "There are, sometimes it is hard to know where to start!",
        user_id: 3,
        post_id: 2
    },
    {
        comment_text: "I agree",
        user_id: 3,
        post_id: 3
    },
    {
        comment_text: "#Python forever",
        user_id: 2,
        post_id: 3
    }
]
const postdata = [
    {
        title: "Stuck on Handlebars",
        post_content: "Wondering how to conditionally render html in handlebars, tried to write a handlebars helper function.",
        user_id: 1
    }, 
    {
        title: "Npm Package Manager",
        post_content: "So many things to choose from!",
        user_id: 3
    }, 
    {
        title: "Why Node.js is the best",
        post_content: "Lots of functionality",
        user_id: 2
    },
    {
        title: "Full Stack Development",
        post_content: "So many parts to it!",
        user_id: 1
    }
]

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});
const seedComments = () => Comment.bulkCreate(commentdata);
const seedPosts = () => Post.bulkCreate(postdata);


const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  process.exit(0);
};

seedAll();