const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  //retrive token from header
  let token = req.header("x-auth-token");

  //If no token in headers, get it from body
  if (token === undefined) {
    token = req.body.token;
  }

  //If no token in headers, get it from query string
  if (token === undefined) {
    token = req.query.token;
  }

  console.log(token);

  //Check if token exist
  if (!token) {
    return res.status(401).json({
      msg: "No token found! Access denied.",
    });
  }

  // Verify the token
  try {
    const decodedToken = jwt.verify(token, config.get("jwtSecret"));
    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      msg: "Token not valid! Access denied.",
    });
  }
};
