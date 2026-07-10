import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cotRoutes from "./routes/cotRoutes.js";

dotenv.config();

connectDB();

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
