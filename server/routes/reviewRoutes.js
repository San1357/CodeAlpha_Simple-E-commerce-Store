const express = require("express");
const {
  addReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/reviewController");
const protect = require("../middlewares/auth");

const router = express.Router();

// Public route
router.get("/:productId", getProductReviews);

// Protected routes
router.post("/", protect, addReview);
router.delete("/:reviewId", protect, deleteReview);

module.exports = router;
