import express from "express";
import Goal from "../models/Goal.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();

console.log("✅ goalRoutes loaded");

// GET all goals for logged-in user
router.get("/", protectUser, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({
      startDate: -1,
    });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET one goal
router.get("/:id", protectUser, async (req, res) => {
  try {
    const goal = await Goal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE goal
router.post("/", protectUser, async (req, res) => {
  try {
    const goal = await Goal.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// UPDATE goal
router.put("/:id", protectUser, async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id,
      },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    res.json(goal);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE goal
router.delete("/:id", protectUser, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    res.json({
      message: "Goal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
