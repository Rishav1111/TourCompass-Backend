const express = require("express");
const router = express.Router();

const {
  createNotification,
  getGuideNotifications,
  getTravelerNotifications,
  deleteNotificationOfTraveler,
  deleteNotificationOfGuide,
} = require("../controllers/notification");

router.post("/createNotification", createNotification);
router.get("/getGuideNotification/:guideId", getGuideNotifications);
router.get("/getTravelerNotification/:travelerId", getTravelerNotifications);
router.delete(
  "/deleteAllTravelerNotifications/:travelerId",
  deleteNotificationOfTraveler
);
router.delete(
  "/deleteAllGuideNotifications/:guideId",
  deleteNotificationOfGuide
);

module.exports = router;
