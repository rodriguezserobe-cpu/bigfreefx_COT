import express from "express";
import {
  getDashboardStats,
  getAllUsers,
  approveUser,
  rejectUser,
} from "../controllers/adminController.js";

const router = express.Router();

// ========================================
// Dashboard Statistics
// ========================================
router.get("/stats", getDashboardStats);

// ========================================
// Get All Users
// ========================================
router.get("/users", getAllUsers);

// ========================================
// Approve User
// ========================================
router.put("/approve/:id", approveUser);

// ========================================
// Reject User
// ========================================
router.put("/reject/:id", rejectUser);

export default router;
