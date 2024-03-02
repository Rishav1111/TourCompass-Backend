const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/admin");

router.post("/register", register);
router.post("/adminlogin", login);

module.exports = router;
