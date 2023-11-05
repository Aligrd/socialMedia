const { verify } = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  console.log(accessToken);

  if (!accessToken) {
    return res.json({ error: "there is no access token in header" });
  }
  try {
    const validToken = verify(accessToken, "secret1234");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
