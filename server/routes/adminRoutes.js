const express = require("express");
const {
  getAllOrders,
  updateOrderStatus,
  updateProductStock,
  deleteUser,
} = require("../controllers/adminController");
const protect = require("../middlewares/auth");
const adminOnly = require("../middlewares/admin");

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, adminOnly);

// Order management
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrderStatus);

// Stock management
router.put("/stock/:id", updateProductStock);

// User management
router.delete("/user/:id", deleteUser);

module.exports = router;
