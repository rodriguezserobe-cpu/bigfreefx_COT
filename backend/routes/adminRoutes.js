import express from "express";

import {
  getDashboardStats,
  getAllUsers,
  approveUser,
  rejectUser,
  makeAdmin,
} from "../controllers/adminController.js";

import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all admin routes
router.use(protectAdmin);

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

// ========================================
// Make User Admin
// ========================================
router.put("/make-admin/:id", makeAdmin);

export default router;
