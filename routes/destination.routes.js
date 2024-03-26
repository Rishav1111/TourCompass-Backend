const express = require("express");
const router = express.Router();
const { createDest } = require("../controllers/destination");

router.post("/destination", createDest);

module.exports = router;
