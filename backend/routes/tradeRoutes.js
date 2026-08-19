import express from "express";
import Trade from "../models/Trade.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("✅ tradeRoutes loaded");

router.get("/test", (req, res) => {
  res.json({ message: "Trade route works!" });
});

// GET all trades for logged-in user
router.get("/", protectUser, async (req, res) => {
  try {
    const trades = await Trade.find({
      user: req.user._id,
    }).sort({ openDate: -1 });

    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET one trade belonging to logged-in user
router.get("/:id", protectUser, async (req, res) => {
  try {
    const trade = await Trade.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trade) {
      return res.status(404).json({
        message: "Trade not found",
      });
    }

    res.json(trade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE trade for logged-in user
router.post("/", protectUser, async (req, res) => {
  try {
    const trade = await Trade.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(trade);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// UPDATE trade belonging to logged-in user
router.put("/:id", protectUser, async (req, res) => {
  try {
    const trade = await Trade.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!trade) {
      return res.status(404).json({
        message: "Trade not found",
      });
    }

    res.json(trade);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE trade belonging to logged-in user
router.delete("/:id", protectUser, async (req, res) => {
  try {
    const trade = await Trade.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!trade) {
      return res.status(404).json({
        message: "Trade not found",
      });
    }

    res.json({
      message: "Trade deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
