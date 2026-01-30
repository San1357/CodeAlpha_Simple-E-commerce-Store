const express = require("express");
const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/addressController");
const protect = require("../middlewares/auth");

const router = express.Router();

// All address routes are protected
router.use(protect);

router.post("/", addAddress);
router.get("/", getAddresses);
router.put("/default/:id", setDefaultAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

module.exports = router;
