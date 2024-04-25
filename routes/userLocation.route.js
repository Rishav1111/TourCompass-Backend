const express = require("express");
const router = express.Router();

const {
  saveLocation,
  getUserLocation,
  getGuideLocation,
  getTravelerLocation,
} = require("../controllers/usersLocation");

router.post("/saveLocation", saveLocation);
router.get("/getUserLocation/:userId", getUserLocation);
router.get("/getGuideLocation/:userId", getGuideLocation);
router.get("/getTravelerLocation/:userId", getTravelerLocation);

module.exports = router;
