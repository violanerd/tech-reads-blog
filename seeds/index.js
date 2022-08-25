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
        comment_text: "Yo",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Hey",
        user_id: 2,
        post_id: 1
    },
    {
        comment_text: "Banana",
        user_id: 3,
        post_id: 2
    }
]
const postdata = [
    {
        title: "Oranges",
        post_content: "Oranges are yucky",
        user_id: 1
    }, 
    {
        title: "Bananas",
        post_content: "Bananas are yummy",
        user_id: 3
    }, 
    {
        title: "Peanuts",
        post_content: "Dangerous",
        user_id: 2
    }
]

const seedUsers = () => User.bulkCreate(userdata);
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