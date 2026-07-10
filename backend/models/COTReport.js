import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    long: {
      type: Number,
      default: 0,
    },

    short: {
      type: Number,
      default: 0,
    },

    changeLong: {
      type: Number,
      default: 0,
    },

    changeShort: {
      type: Number,
      default: 0,
    },

    longPercent: {
      type: Number,
      default: 0,
    },

    shortPercent: {
      type: Number,
      default: 0,
    },

    netPosition: {
      type: Number,
      default: 0,
    },

    bias: {
      type: String,
      default: "Neutral",
    },
  },
  {
    _id: false,
  },
);

const cotReportSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["FOREX", "INDICES", "METALS", "CRYPTO"],
      required: true,
    },

    market: {
      type: String,
      required: true,
    },

    reportDate: {
      type: Date,
      required: true,
    },

    openInterest: {
      type: Number,
      default: 0,
    },

    commercials: groupSchema,

    nonCommercials: groupSchema,

    retail: groupSchema,
  },
  {
    timestamps: true,
  },
);

cotReportSchema.index(
  {
    market: 1,
    reportDate: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("COTReport", cotReportSchema);
