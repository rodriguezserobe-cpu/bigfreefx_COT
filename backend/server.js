import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cotRoutes from "./routes/cotRoutes.js";

import { saveLatestReportsToDB } from "./services/cftcService.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("🚀 BigFree FX Backend Running");
});

// ================= AUTH =================
app.use("/api/auth", authRoutes);

// ================= ADMIN =================
app.use("/api/admin", adminRoutes);

// ================= COT =================
app.use("/api/cot", cotRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    console.log("📥 Downloading latest CFTC report...");
    await saveLatestReportsToDB();
    console.log("✅ Latest CFTC report saved.");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
  }
};

startServer();
