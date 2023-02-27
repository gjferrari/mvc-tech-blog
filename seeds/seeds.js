const { User, Feeling } = require("../models");
const seedCategories = require("./category-seeds");
const seedProducts = require("./product-seeds");
const seedTime = require("./time-seeds");
const seedProductTimes = require("./product-time-seeds");
const seedQuestions = require("./question-seed");
const userData = require("./userData.json");
const feelingData = require("./feelingData.json");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await seedTime();
  console.log("\n----- TIME SEEDED -----\n");

  await seedCategories();
  console.log("\n----- CATEGORIES SEEDED -----\n");

  await seedProducts();
  console.log("\n----- PRODUCTS SEEDED -----\n");

  await seedProductTimes();
  console.log("\n----- PRODUCT TIME SEEDED -----\n");

  await seedQuestions();
  console.log("\n----- PRODUCT QUESTIONS SEEDED -----\n");

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const feeling of feelingData) {
    await Feeling.create({
      ...feeling,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // await seedUser();
  // console.log("\n----- USERS SEEDED -----\n");

  // console.log("\n-----USERS SEEDED-----\n");

  process.exit(0);
};

seedAll();