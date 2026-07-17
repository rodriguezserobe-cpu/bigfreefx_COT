import express from "express";

import {
  fetchCFTCData,
  buildLiveCOTData,
  saveLatestReportsToDB,
} from "../services/cftcService.js";

const router = express.Router();

// ==========================================
// Raw CFTC Data
// ==========================================
router.get("/", async (req, res) => {
  try {
    const data = await fetchCFTCData();

    res.status(200).json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load COT data.",
    });
  }
});
// ==========================================
// Live Dashboard Data
// ==========================================
router.get("/live", async (req, res) => {
  try {
    console.log("LIVE ROUTE HIT");

    // DON'T download CFTC data every request
    // await saveLatestReportsToDB();

    const { marketType, asset, group } = req.query;

    const data = await buildLiveCOTData({
      marketType,
      asset,
      group,
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("LIVE ROUTE ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
});
export default router;
