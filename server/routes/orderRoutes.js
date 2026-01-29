const express = require("express");
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getOrderStatus,
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
router.get("/:id/status", getOrderStatus);

// Admin routes
router.get("/all/list", adminOnly, getAllOrders);
router.put("/status/:id", adminOnly, updateOrderStatus);

module.exports = router;
