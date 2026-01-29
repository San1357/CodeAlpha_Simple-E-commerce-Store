const express = require("express");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");
const protect = require("../middlewares/auth");

const router = express.Router();

// All wishlist routes are protected
router.use(protect);

router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove/:id", removeFromWishlist);

module.exports = router;
