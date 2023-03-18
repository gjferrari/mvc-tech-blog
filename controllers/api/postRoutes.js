const router = require("express").Router();
const { User, Comment, Post } = require("../../models");
const withAuth = require("../../utils/auth");
// on line 5 means /api/posts/
router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await postMessage.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "content", "date_created"],
    order: [["date_created", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "user_id", "date_created"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findOne({
    attributes: ["id", "title", "content", "date_created"],
    order: [["date_created", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "content", "user_id", "date_created"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    ],
  })
    .then((postData) => res.json(postData))
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
