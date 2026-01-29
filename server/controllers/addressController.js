const mongoose = require("mongoose");
const Address = require("../models/Address");

// @desc    Add new address
// @route   POST /api/address
// @access  Private
const addAddress = async (req, res) => {
  try {
    const { fullName, mobile, street, city, state, pincode } = req.body;

    // Validate required fields
    if (!fullName || !mobile || !street || !city || !state || !pincode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: fullName, mobile, street, city, state, pincode",
      });
    }

    // Check if this is user's first address — make it default
    const existingCount = await Address.countDocuments({ userId: req.user._id });
    const isDefault = existingCount === 0;

    const address = await Address.create({
      userId: req.user._id,
      fullName,
      mobile,
      street,
      city,
      state,
      pincode,
      isDefault,
    });

    res.status(201).json({
      success: true,
      message: isDefault
        ? "Address added and set as default"
        : "Address added successfully",
      address,
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

// @desc    Get all addresses of logged-in user
// @route   GET /api/address
// @access  Private
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user._id }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: addresses.length,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update address
// @route   PUT /api/address/:id
// @access  Private
const updateAddress = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Check ownership
    if (address.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this address",
      });
    }

    const { fullName, mobile, street, city, state, pincode } = req.body;

    if (fullName) address.fullName = fullName;
    if (mobile) address.mobile = mobile;
    if (street) address.street = street;
    if (city) address.city = city;
    if (state) address.state = state;
    if (pincode) address.pincode = pincode;

    await address.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Delete address
// @route   DELETE /api/address/:id
// @access  Private
const deleteAddress = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Check ownership
    if (address.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this address",
      });
    }

    const wasDefault = address.isDefault;

    await Address.findByIdAndDelete(req.params.id);

    // If deleted address was default, set another one as default
    if (wasDefault) {
      const nextAddress = await Address.findOne({ userId: req.user._id }).sort({
        createdAt: -1,
      });
      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Set address as default
// @route   PUT /api/address/default/:id
// @access  Private
const setDefaultAddress = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid address ID",
      });
    }

    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Check ownership
    if (address.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to modify this address",
      });
    }

    // Remove default from all user's addresses
    await Address.updateMany(
      { userId: req.user._id },
      { isDefault: false }
    );

    // Set this one as default
    address.isDefault = true;
    await address.save();

    res.status(200).json({
      success: true,
      message: "Default address updated",
      address,
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
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
