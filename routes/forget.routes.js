const express = require("express");
const router = express.Router();
const {
  FORGETPASSWORD,
  verifyPin,
  resetPassword,
} = require("../controllers/forgetPassword");

// routes of forgetpassword, verify pin and rest password
router.post("/forgetpassword", FORGETPASSWORD);
router.post("/verifyPin", verifyPin);
router.post("/resetPassword", resetPassword);

module.exports = router;
