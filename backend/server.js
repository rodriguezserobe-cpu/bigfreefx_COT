import express from "express";
import cors from "cors";
import { cotData } from "./data/cotData.js";
import { fetchCFTCData } from "./services/cftcService.js";

const app = express();

app.use(cors());

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

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
