const express = require("express");
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const protect = require("../middlewares/auth");
const adminOnly = require("../middlewares/admin");

const router = express.Router();

// All order routes are protected
router.use(protect);

// User routes
router.post("/", createOrder);
router.get("/my", getMyOrders);
router.get("/:id", getOrderById);

// Admin routes
router.get("/all/list", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
