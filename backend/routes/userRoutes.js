import express from "express";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

const allowedCurrencies = [
  "ZAR",
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "NZD",
  "LSL",
];

// Get logged-in user's profile
router.get("/profile", protectUser, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        country: req.user.country,
        currency: req.user.currency || "ZAR",
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Update currency
router.put("/currency", protectUser, async (req, res) => {
  try {
    const { currency } = req.body;

    if (!allowedCurrencies.includes(currency)) {
      return res.status(400).json({
        message: "Invalid currency",
      });
    }

    req.user.currency = currency;

    await req.user.save();

    res.json({
      success: true,
      message: "Currency updated successfully",
      currency: req.user.currency,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
