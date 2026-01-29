const mongoose = require("mongoose");
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

// @desc    Add product to wishlist
// @route   POST /api/wishlist/add
// @access  Private
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Validate productId
    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid product ID is required",
      });
    }

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ userId: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user._id, products: [] });
    }

    // Check duplicate
    const alreadyExists = wishlist.products.some(
      (item) => item.productId.toString() === productId
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    // Add product
    wishlist.products.push({ productId });
    await wishlist.save();

    await wishlist.populate(
      "products.productId",
      "name price image stock category"
    );

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      userId: req.user._id,
    }).populate("products.productId", "name price image stock category rating");

    if (!wishlist || wishlist.products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Wishlist is empty",
        wishlist: { products: [] },
      });
    }

    res.status(200).json({
      success: true,
      count: wishlist.products.length,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/remove/:id
// @access  Private
const removeFromWishlist = async (req, res) => {
  try {
    const { id: productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const wishlist = await Wishlist.findOne({ userId: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    const itemIndex = wishlist.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    wishlist.products.splice(itemIndex, 1);
    await wishlist.save();

    await wishlist.populate(
      "products.productId",
      "name price image stock category"
    );

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
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
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};
