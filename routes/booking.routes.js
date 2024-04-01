const express = require("express");
const router = express.Router();
const {
  createBooking,
  getGuideByBooking,
  getTravelerByBooking,
} = require("../controllers/booking");

router.post("/booking", createBooking);
router.get("/bookings/:travelerId/guide", getGuideByBooking);
router.get("/bookings/:guideId/traveler", getTravelerByBooking);

module.exports = router;
