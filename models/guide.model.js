const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: Number,
    required: true,
  },
  expertPlace: {
    type: String,
    required: true,
  },
  guidePrice: {
    type: Number,
    required: true,
  },
  licensePhoto: {
    type: String,
    required: true,
  },
  guidePhoto: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  verification: {
    type: String,
    enum: ["Pending", "Verified", "Rejected"],
    default: "Pending",
  },
  resetPin: String,
  resetPinExpiration: Date,
});

module.exports = mongoose.model("Guide", guideSchema);
