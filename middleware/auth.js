const jwt = require("jsonwebtoken");
const jwtSecret = "access";
const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(403).send({ msg: "No authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).send({ msg: "No authorized" });
  }
};

module.exports = authUser;
