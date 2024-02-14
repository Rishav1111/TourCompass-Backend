const express = require("express");
const router = express.Router();
const {
  createGuide,
  createTraveller,
  login,
  updateTraveller,
  updateGuide,
  deleteTraveler,
  deleteGuide,
} = require("../controllers/user");

// Routes
router.post("/signupGuide", createGuide);
router.post("/signupTraveller", createTraveller);
router.post("/login", login);
router.put("/updateGuide/:id", updateGuide);
router.put("/updateTraveller/:id", updateTraveller);
router.delete("/deleteTraveller/:id", deleteTraveler);
router.delete("/deleteGuide/:id", deleteGuide);

module.exports = router;
