const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  updateReview,
  getReviewsbyGuideId,
  deleteReview,
} = require("../controllers/review");
const {
  tokenExtractor,
  adminScope,
  authUser,
} = require("../middleware/token_auth");

router.post("/createReview", tokenExtractor, authUser, createReview);
router.put("/updateReview/:id", tokenExtractor, adminScope, updateReview);
router.get("/getAllReviews", tokenExtractor, adminScope, getAllReviews);
router.get(
  "/getReviewByGuideId/:id",
  tokenExtractor,
  authUser,
  getReviewsbyGuideId
);

router.delete("/deleteReview/:id", tokenExtractor, adminScope, deleteReview);

module.exports = router;
