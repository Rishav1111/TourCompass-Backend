const express = require("express");
const router = express.Router();
const {
  createBooking,
  getGuideByBooking,
  getTravelerByBooking,
  updateBookingStatus,
  getAllBookings,
  countBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking");
const {
  tokenExtractor,
  adminScope,
  authUser,
} = require("../middleware/token_auth");

router.post("/booking", tokenExtractor, createBooking);
router.get("/getAllbookings", tokenExtractor, adminScope, getAllBookings);
router.get("/bookings/:travelerId/guide", getGuideByBooking);
router.get("/bookings/:guideId/traveler", getTravelerByBooking);
router.put("/bookings/:bookingId/updateStatus", updateBookingStatus);
router.get("/bookings/count", countBookings);
router.get("/booking/:id", tokenExtractor, adminScope, getBookingById);
router.put("/updateBooking/:id", tokenExtractor, adminScope, updateBooking);
router.delete("/deleteBooking/:id", tokenExtractor, adminScope, deleteBooking);
module.exports = router;
