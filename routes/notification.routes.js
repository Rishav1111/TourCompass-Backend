const express = require("express");
const router = express.Router();

const {
  createNotification,
  getGuideNotifications,
  getTravelerNotifications,
  deleteNotificationOfTraveler,
} = require("../controllers/notification");

router.post("/createNotification", createNotification);
router.get("/getGuideNotification/:guideId", getGuideNotifications);
router.get("/getTravelerNotification/:travelerId", getTravelerNotifications);
router.delete(
  "/deleteAllTravelerNotifications/:travelerId",
  deleteNotificationOfTraveler
);

module.exports = router;
