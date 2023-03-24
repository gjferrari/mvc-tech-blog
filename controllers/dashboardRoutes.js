const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  console.log("edit post");
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    // attributes: ["id", "content", "title", "date_created"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "post_id", "user_id", "date_created"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render("dashboard", {
        posts,
        loggedIn: true,
        name: req.session.name,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);
    res.render("edit-post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.get("/edit/:id", withAuth, (req, res) => {
//   Post.findByPk(req.params.id, {
//     attributes: ["id", "content", "title", "date_created"],
//     include: [
//       User,
//       {
//         model: Comment,
//         include: [User],
//       },

//       // {
//       //   model: Comment,
//       //   attributes: ["id", "content", "post_id", "user_id", "date_created"],
//       //   include: {
//       //     model: User,
//       //     attributes: ["name"],
//       //   },
//       // },
//       // {
//       //   model: User,
//       //   attributes: ["name"],
//       // },
//     ],
//   })
//     .then((postData) => {
//       console.log(postData);
//       if (postData) {
//         const post = postData.get({ plain: true });
//         console.log(post);
//         res.render("edit-post", {
//           post,
//           loggedIn: true,
//           username: req.session.name,
//         });
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

module.exports = router;
