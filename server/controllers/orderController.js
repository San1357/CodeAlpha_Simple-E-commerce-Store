const mongoose = require("mongoose");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// @desc    Create order from cart (Checkout)
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod = "COD" } = req.body;

    // Validate shipping address
    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const requiredFields = [
      "fullName",
      "mobile",
      "street",
      "city",
      "state",
      "pincode",
    ];
    for (const field of requiredFields) {
      if (!shippingAddress[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required in shipping address`,
        });
      }
    }

    // Fetch user's cart
    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      "items.productId",
      "name price stock image"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty. Add items before placing an order",
      });
    }

    // Verify stock and build order items
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.productId;

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "A product in your cart no longer exists",
        });
      }

      if (item.quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}`,
        });
      }

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image || "",
      });
    }

    // Calculate prices
    const itemsPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shippingPrice = itemsPrice >= 500 ? 0 : 40;
    const totalPrice = itemsPrice + shippingPrice;

    // Set payment status
    const paymentStatus = paymentMethod === "COD" ? "Pending" : "Paid";

    // Create order
    const order = await Order.create({
      userId: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus: "Placed",
      itemsPrice,
      shippingPrice,
      totalPrice,
    });

    // Reduce product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear user's cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Private (owner or admin)
const getOrderById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only owner or admin can view
    if (
      order.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/all
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Allowed status flow (forward only)
const STATUS_FLOW = ["Placed", "Packed", "Out for Delivery", "Delivered"];

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/status/:id
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Validate status value
    if (!STATUS_FLOW.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed values: ${STATUS_FLOW.join(", ")}`,
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Prevent backward status transition
    const currentIndex = STATUS_FLOW.indexOf(order.orderStatus);
    const newIndex = STATUS_FLOW.indexOf(status);

    if (newIndex <= currentIndex) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from "${order.orderStatus}" to "${status}". Only forward transitions allowed: ${STATUS_FLOW.join(" → ")}`,
      });
    }

    order.orderStatus = status;
    order.statusUpdatedAt = Date.now();

    if (paymentStatus) order.paymentStatus = paymentStatus;

    // Auto-mark as Paid when Delivered
    if (status === "Delivered") {
      order.paymentStatus = "Paid";
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to "${status}"`,
      order: {
        orderId: order._id,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        statusUpdatedAt: order.statusUpdatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get order status (User - own order only)
// @route   GET /api/orders/:id/status
// @access  Private
const getOrderStatus = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order ID",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only owner or admin can view status
    if (
      order.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    // Build progress steps for frontend
    const steps = STATUS_FLOW.map((step, index) => {
      const currentIndex = STATUS_FLOW.indexOf(order.orderStatus);
      return {
        step: index + 1,
        label: step,
        completed: index <= currentIndex,
        active: index === currentIndex,
      };
    });

    res.status(200).json({
      success: true,
      orderId: order._id,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      statusUpdatedAt: order.statusUpdatedAt,
      progress: steps,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getOrderStatus,
};
