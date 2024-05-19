const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  updateReview,
  getReviewsbyGuideId,
  deleteReview,
  countReviews,
} = require("../controllers/review");
const {
  tokenExtractor,
  adminScope,
  authUser,
} = require("../middleware/token_auth");

//routes for rating and reviews
router.post("/createReview", createReview);
router.put("/updateReview/:id", tokenExtractor, adminScope, updateReview);
router.get("/getAllReviews", tokenExtractor, adminScope, getAllReviews);
router.get(
  "/getReviewByGuideId/:id",

  getReviewsbyGuideId
);

//route for delete reviews
router.delete("/deleteReview/:id", tokenExtractor, adminScope, deleteReview);
router.get("/reviews/count", countReviews);
module.exports = router;
