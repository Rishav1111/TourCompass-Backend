const express = require("express");
const router = express.Router();

const { saveLocation } = require("../controllers/usersLocation");

router.post("/saveLocation", saveLocation);

module.exports = router;
