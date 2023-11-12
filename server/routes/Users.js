const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const router = express.Router();
const randomStringGenerator = require("randomstring");
const { Users } = require("../models"); //user model
const _db = require("../models/index");
const { validateToken } = require("../middlewares/AuthMiddleware");
router.get("/", async (req, res) => {
  const usersList = await Users.findAll();
  res.json(usersList);
});

//! get current logged in user data
router.get("/user", validateToken, async (req, res) => {
  const username = req.user.username;
  const user = await Users.findOne({
    where: {
      username: username,
    },
  });

  res.json(user);
});
//! gewt user by its id
router.get("/profile/:id", async (req, res) => {
  let { id } = req.params;

  const user = await Users.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
  });

  res.json(user);
});
//! signin
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  //check if user by this username or email already existed
  const existedUser = await Users.findOne({
    where: {
      username: username,
    },
  });

  if (existedUser) res.send(`user ${username} already exist!`);
  else {
    bcrypt.hash(password, 10).then((hashed) => {
      Users.create({
        username: username,
        email: email,
        password: hashed,
      });
    });
    res.json(`user ${username} created`);
  }
});
const secret = randomStringGenerator.generate(10); // random generated string for hashing
//!  login and authentication!
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    res.send(`${username} does not exist!`);
  } else {
    const hashed = user["password"];
    bcrypt.compare(password, hashed).then((match) => {
      if (match) {
        const accessToken = jwt.sign(
          {
            username: user.username,
            id: user.id,
          },
          "secret1234" //make it dynamic with generation
        ); //jwt access token for user session with a random string generator

        res.json({
          username: username,
          id: user.id,
          authStatus: true,
          accessToken: accessToken,
        });
      } else {
        res.json({
          authStatus: false,
          err: "username or password is wrong",
        });
      }
    });
  }
});

//! validate user accessToken to ensure the authentication
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});
//! update password
router.post("/update/password", validateToken, async (req, res) => {
  const { passowrd, newPassword } = req.body;
  console.log(req.body);

  // res.json(req.body);
  const { id } = req.user;

  const user = await _db.Users.findByPk(id);

  const isMatch = await bcrypt.compare(passowrd, user.password);

  if (isMatch) {
    const newHash = await bcrypt.hash(newPassword, 10);

    await _db.Users.update(
      { password: newHash },
      {
        where: {
          id: id,
        },
      }
    );
    res.json({ success: true });
  } else {
    res.json({ error: "wrong password!" });
  }
});

module.exports = {
  userRouter: router,
  hashSecret: secret,
};
