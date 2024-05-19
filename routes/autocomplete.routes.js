const express = require("express");
const router = express.Router();
const { autocomplete } = require("../controllers/search");

// route for get places suggestions
router.get("/autocomplete", autocomplete);

module.exports = router;
