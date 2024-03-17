const express = require("express");
const router = express.Router();
const { autocomplete } = require("../controllers/search");

router.get("/autocomplete", autocomplete);

module.exports = router;
