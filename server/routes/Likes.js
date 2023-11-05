const express = require("express");

const router = express.Router();

const Likes = require("../models/Likes");
const _db = require("../models/index");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Posts } = require("../models");
const { Op } = require("sequelize");

// create like for post

router.post("/:postId", validateToken, async (req, res) => {
  //! we need to check if like is alreay exist if exists we should update it AND if  it is liked for first time we need to create it

  const { postId } = req.body;
  const { user } = req;

  // console.log(user);

  const isUserLikeExists = await _db.Likes.findOne({
    where: {
      PostId: postId,
      UserId: user.id,
    },
  });
  console.log(isUserLikeExists);

  if (!isUserLikeExists) {
    //! if it dont already exist we create it to  LIKE IT
    const like = await _db.Likes.create({
      PostId: postId,
      UserId: user.id,
    });
    res.json("post Liked");
  } else {
    //! if it exist in database we remove it to DISLIKE it
    const like = await _db.Likes.destroy({
      where: {
        PostId: postId,
        UserId: user.id,
      },
    });
    res.json("post disliked");
  }
});

// get number of likes of post
router.get("/:postId", validateToken, async (req, res) => {
  const { postId } = req.params;
  const { user } = req;
  console.log(user);

  const IsUserLikedPost = await _db.Likes.findOne({
    where: {
      PostId: Number(postId),
      UserId: Number(user.id),
    },
  });

  const allLikes = await _db.Likes.findAll({
    where: {
      PostId: Number(postId),
    },
  });

  if (!IsUserLikedPost) {
    res.json({
      likeCount: allLikes.length,
      isUserLiked: false,
    });
  } else {
    res.json({
      likeCount: allLikes.length,
      isUserLiked: true,
    });
  }
});

module.exports = router;
