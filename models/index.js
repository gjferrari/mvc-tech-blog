const User = require("./User");
const Comment = require("./Comment");
const Post = require("./Post");

// Feeling.belongsToMany(User);
// User.hasMany

// relationship between User and Post
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

// relationship between User and comment
User.hasMany(Comment, {
  foreignKey: "user_id",
  // onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

//relationship between comment and post
// Comment.belongsTo(Post, {
//   foreignKey: "post_id",
// });

Post.hasMany(Comment, {
  foreignKey: "user_id",
});

module.exports = { User, Comment, Post };
