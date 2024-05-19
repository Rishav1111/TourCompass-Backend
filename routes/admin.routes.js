const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/admin");

//Admin login and  register route
router.post("/register", register);
router.post("/adminlogin", login);

module.exports = router;
