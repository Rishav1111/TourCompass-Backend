const express = require("express");
const router = express.Router();
const {
  FORGETPASSWORD,
  verifyPin,
  resetPassword,
} = require("../controllers/forgetPassword");

router.post("/forgetpassword", FORGETPASSWORD);
router.post("/verifyPin", verifyPin);
router.post("/resetPassword", resetPassword);

module.exports = router;
