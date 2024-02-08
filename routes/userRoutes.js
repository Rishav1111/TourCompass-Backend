const express = require("express");
const router = express.Router();
const {
  createGuide,
  createTraveller,
  login,
  deleteUser,
} = require("../controllers/user");

// Routes
router.post("/signupGuide", createGuide);
router.post("/signupTraveller", createTraveller);
router.post("/login", login);
router.delete("/delete", deleteUser);

module.exports = router;
