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
router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const listOfPosts = await Posts.findAll({
    where: {
      UserId: id,
    },
    include: [_db.Likes],
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
  post.UserId = req.user.id;

  if (post.username != null) {
    await Posts.create(post);
    res.json(post);
  } else {
    res.json({ error: "no data in request body" });
  }
});

//! we want to edit a post tile and postText
router.post("/edit/:postId", validateToken, async (req, res) => {
  const { postId } = req.params;
  const { title, postText } = req.body;

  if (isNaN(postId)) {
    res.json({ error: "parameters is not a number" });
  } else {
    const edit = await _db.Posts.update(
      {
        title: title,
        postText: postText,
      },
      {
        where: {
          id: postId,
        },
      }
    );

    edit[0] === 1
      ? res.json({ status: "Edit Successful" })
      : res.json({ error: "edit Unsuccessful" });
  }
});

//delete a post by id
router.delete("/:postId", validateToken, async (req, res) => {
  const { postId } = req.params;
  const { id } = req.user;

  const deleteResult = await _db.Posts.destroy({
    where: {
      id: postId,
      UserId: id,
    },
  });

  deleteResult[o] === 1
    ? res.json({ status: "Post Deleted Successfully" })
    : res.json({ status: "There is no Post With This POSTID" });
});

module.exports = router;

//get id of last entry record
