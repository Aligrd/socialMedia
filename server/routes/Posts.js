const express = require("express");

const router = express.Router();

const { Posts } = require("../models");
const { Op } = require("sequelize");
const _db = require("../models/index");
const { validateToken } = require("../middlewares/AuthMiddleware");

//!we can make a route to get all posts associated to this user

//get all posts
router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({
    include: [_db.Likes],
  });
  res.json(listOfPosts);
});

//get all posts of specefic user id to show in its profile
router.get("/user/:id", validateToken, async (req, res) => {
  const { id } = req.params;

  const listOfPosts = await Posts.findAll({
    where: {
      username: username,
    },
  });

  res.json(listOfPosts);
});

//get a post based on a searched phrase in frontend
router.post("/search", async (req, res) => {
  const searchPhrase = req.body["searchPhrase"];
  const searchedPost = await Posts.findAll({
    where: {
      postText: {
        [Op.like]: `%${searchPhrase}%`,
      },
    },
  });
  res.json(searchedPost);
});
//get a post based on its id
router.get("/id/:id", async (req, res) => {
  const postID = req.params.id;
  const post = await Posts.findOne({
    where: {
      id: postID,
    },
  });
  res.json(post);
});

//POST post to backend
router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;

  console.log(post);

  if (post.username != null) {
    await Posts.create(post);
    res.json(post);
  } else {
    res.json({ error: "no data in request body" });
  }
});

//delete a post by id
router.delete("/", validateToken, async (req, res) => {
  const { postId } = req.body;
  const userName = req.user.username;
  const post = await _db.Posts.findOne({
    where: {
      PostId: postId,
      username: userName,
    },
  });

  if (!post) {
    res.json({ err: `there is no post with id : ${postId}` });
  } else {
    const post = await _db.Posts.destroy({
      where: {
        PostId: postId,
        username: userName,
      },
    });
    res.json({ success: "post removed!" });
  }
});

module.exports = router;

//get id of last entry record
