const express = require("express");
const router = express.Router();
const {
  createBooking,
  getGuideByBooking,
  getTravelerByBooking,
  updateBookingStatus,
  getAllBookings,
  countBookings,
} = require("../controllers/booking");
const { tokenExtractor, adminScope } = require("../middleware/token_auth");

router.post("/booking", tokenExtractor, createBooking);
router.get("/getAllbookings", tokenExtractor, adminScope, getAllBookings);
router.get("/bookings/:travelerId/guide", getGuideByBooking);
router.get("/bookings/:guideId/traveler", getTravelerByBooking);
router.put("/bookings/:bookingId/updateStatus", updateBookingStatus);
router.get("/bookings/count", countBookings);
module.exports = router;
