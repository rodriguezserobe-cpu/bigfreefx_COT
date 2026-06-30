import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import { cotData } from "./data/cotData.js";
import { fetchCFTCData } from "./services/cftcService.js";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("BigFree FX Backend Running 🚀");
});

app.get("/api/cot", (req, res) => {
  res.json(cotData);
});

app.get("/api/cot/live", async (req, res) => {
  const data = await fetchCFTCData();
  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
