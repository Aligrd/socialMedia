const express = require("express");
const rateLimitMiddleWare = require("../middlewares/rateLimitMiddleWare");

const router = express.Router();

router.use(rateLimitMiddleWare);

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    req_date: new Date(Date.now()),
  });
});

module.exports = router;
