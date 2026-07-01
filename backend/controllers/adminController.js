import User from "../models/User.js";

// ========================================
// Dashboard Statistics
// ========================================
export const getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await User.countDocuments();

    const pendingUsers = await User.countDocuments({
      status: "pending",
    });

    const approvedUsers = await User.countDocuments({
      status: "approved",
    });

    const rejectedUsers = await User.countDocuments({
      status: "rejected",
    });

    res.status(200).json({
      totalMembers,
      pendingUsers,
      approvedUsers,
      rejectedUsers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ========================================
// Get All Users
// ========================================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ========================================
// Approve User
// ========================================
export const approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        status: "approved",
      },
      {
        new: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User approved successfully.",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ========================================
// Reject User
// ========================================
export const rejectUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
      },
      {
        new: true,
      },
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User rejected successfully.",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
