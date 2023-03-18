const router = require("express").Router();
const { User, Comment, Post } = require("../../models");
const withAuth = require("../../utils/auth");

//is commentData the right name?

router.get("/", withAuth, (req, res) => {
  Comment.findAll()
    .then((commentData) => res.json(commentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// not necessary to have separate get routes

// router.get("/:id", (req, res) => {
//   Comment.findOne({
//     attributes: ["id", "content", "date_created"],
//     order: [["date_created", "DESC"]],
//     include: [
//       {
//         model: User,
//         attributes: ["name"],
//       },
//       {
//         model: Post,
//         attributes: ["id", "title", "content", "user_id", "date_created"],
//         include: {
//           model: User,
//           attributes: ["name"],
//         },
//       },
//     ],
//   })
//     .then((commentData) => res.json(commentData))
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
