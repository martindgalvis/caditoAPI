const express = require("express");

const { protect } = require("../controllers/auth");
const reviewController = require("../controllers/review");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect, reviewController.getAllReviews)
  .post(protect, reviewController.createReview);

module.exports = router;
