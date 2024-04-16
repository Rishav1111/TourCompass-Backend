const express = require("express");
const router = express.Router();

const {
  saveLocation,
  getUserLocation,
} = require("../controllers/usersLocation");

router.post("/saveLocation", saveLocation);
router.get("/getUserLocation/:userId", getUserLocation);

module.exports = router;
