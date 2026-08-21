import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pair: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },

    direction: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },

    lotSize: {
      type: Number,
      required: true,
    },

    openDate: {
      type: Date,
      required: true,
    },

    closeDate: {
      type: Date,
      default: null,
    },

    strategy: {
      type: String,
      required: true,
      trim: true,
    },

    result: {
      type: String,
      enum: ["OPEN", "WIN", "LOSS", "BE"],
      default: "OPEN",
    },

    profit: {
      type: Number,
      default: 0,
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

    risk: {
      type: Number,
      default: 1,
    },

    reward: {
      type: Number,
      default: 2,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    beforeSetupImage: {
      type: String,
      default: "",
    },

    afterSetupImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Trade", tradeSchema);
