const mongoose = require("mongoose");

const emailVerifySchema = new mongoose.Schema({
  email: String,
  verifyPin: String,
  PinExpiration: Date,
});

const emailVerify = mongoose.model("EmailVerify", emailVerifySchema);

module.exports = emailVerify;
