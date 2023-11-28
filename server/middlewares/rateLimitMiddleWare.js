const setRateLimit = require("express-rate-limit");

const rateLimitMiddleWare = setRateLimit({
  window: 60 * 1000, //! for every 1 min
  max: 5,
  message: {
    status: "false",
    message: "you have exceeded the limit of request in per min",
  },
  headers: true,
});

module.exports = rateLimitMiddleWare;
