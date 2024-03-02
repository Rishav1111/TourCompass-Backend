const jwt = require("jsonwebtoken");
const jwtSecret = "access";

const tokenExtractor = (req, res, next) => {
  const header = req.headers["authorization"];

  try {
    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      if (bearer.length === 2) {
        const token = bearer[1];
        req.token = token;
        return next();
      }
    }

    throw new Error("Invalid or missing Authorization header");
  } catch (error) {
    return res.status(401).json({
      message: "Token extraction error: " + error.message,
    });
  }
};

const authUser = (req, res, next) => {
  try {
    const { id } = jwt.verify(req.token, jwtSecret);
    console.log(id);

    if (!id) {
      throw new Error("Invalid user ID in token");
    }

    req.user = { id };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication error: " + error.message,
    });
  }
};

const adminScope = (req, res, next) => {
  try {
    const { userType } = jwt.verify(req.token, jwtSecret);

    if (userType !== "admin") {
      return res.status(401).json({
        message: "Insufficient scope!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error: " + error.message,
    });
  }
};

module.exports = { tokenExtractor, authUser, adminScope };
