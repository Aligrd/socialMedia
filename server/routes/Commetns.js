const express = require("express");

const router = express.Router();
//! you should use name of database witch defined in model not the file name
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware"); //token vallidation middleware

//get single commnet by associated to a postId
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const commnets = await Comments.findAll({
    where: {
      PostId: postId,
    },
  });
  res.json(commnets);
});

//get all comments
router.get("/", async (req, res) => {
  const allComments = await Comments.findAll();

  res.json(allComments);
});

// post a comment to backend
router.post("/", validateToken, async (req, res) => {
  const commentObj = req.body;
  const username = req.user.username;
  commentObj.username = username; // getting username from validToken middleware and add it to comment for storing in database

  await Comments.create(commentObj);
  res.json(commentObj);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;
  const commnet = await Comments.findOne({
    where: {
      id: commentId,
    },
  });
  if (commnet) {
    await Comments.destroy({
      where: {
        id: commentId,
      },
    });
    res.json("comment Deleted!");
  } else {
    res.json("there is no comment with this id");
  }
});

module.exports = router;
