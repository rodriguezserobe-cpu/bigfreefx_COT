import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    currency: {
      type: String,
      enum: [
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
      ],
      default: "ZAR",
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    resetToken: {
      type: String,
    },

    resetTokenExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);
