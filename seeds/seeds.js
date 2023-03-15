const sequelize = require("../config/connection");

const { User, Post, Comment } = require("../models");

const userData = require("./userData.JSON");
const postData = require("./postData.JSON");
const commentData = require("./commentData.JSON");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const post = await Post.bulkCreate(postData);

  const comment = await Comment.bulkCreate(commentData);

  process.exit(0);
};
// const commentData = [
//   {
//     content: "Me too! Can't get enough of it!",
//     post_id: "0",
//   },
//   {
//     content: "I don't like your tone, sir",
//     post_id: "1",
//   },
// ];



// const seedAll = async () => {
//   await sequelize.sync({ force: true });
//   console.log("\n----- DATABASE SYNCED -----\n");

//   // await seedTime();
//   // console.log("\n----- TIME SEEDED -----\n");

//   // await seedCategories();
//   // console.log("\n----- CATEGORIES SEEDED -----\n");

//   // await seedProducts();
//   // console.log("\n----- PRODUCTS SEEDED -----\n");

//   // await seedProductTimes();
//   // console.log("\n----- PRODUCT TIME SEEDED -----\n");

//   // await seedQuestions();
//   // console.log("\n----- PRODUCT QUESTIONS SEEDED -----\n");

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   // for (const post of postData) {
//   //   await Post.create({
//   //     ...post,
//   //     user_id: users[Math.floor(Math.random() * users.length)].id,
//   //   });
//   // }

//   // for (const comment of commentData) {
//   //   await Comment.create({
//   //     ...comment,
//   //     user_id: users[Math.floor(Math.random() * users.length)].id,
//   //   });
//   // }

//   // await seedUser();
//   // console.log("\n----- USERS SEEDED -----\n");

//   // console.log("\n-----USERS SEEDED-----\n");

//   process.exit(0);
// };

seedAll();
