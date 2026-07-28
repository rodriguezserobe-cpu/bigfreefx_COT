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

export const cleanupCOTDatabase = async () => {
  console.log("🧹 Starting COT database cleanup...");

  const markets = await COTReport.distinct("market");

  for (const market of markets) {
    const reports = await COTReport.find({ market })
      .sort({ reportDate: -1, createdAt: -1 })
      .lean();

    const seen = new Set();
    const keepIds = [];

    for (const report of reports) {
      // Use market + positions + open interest as a unique signature
      const key = [
        report.market,
        report.openInterest,
        report.commercials.long,
        report.commercials.short,
        report.nonCommercials.long,
        report.nonCommercials.short,
        report.retail.long,
        report.retail.short,
      ].join("|");

      if (!seen.has(key)) {
        seen.add(key);
        keepIds.push(report._id);
      }
    }

    // Delete duplicate reports
    await COTReport.deleteMany({
      market,
      _id: { $nin: keepIds },
    });

    // Keep only the latest 20 reports
    const latest20 = await COTReport.find({ market })
      .sort({ reportDate: -1 })
      .skip(20);

    if (latest20.length > 0) {
      await COTReport.deleteMany({
        _id: { $in: latest20.map((r) => r._id) },
      });
    }

    console.log(`✅ ${market} cleaned`);
  }

  console.log("🎉 COT database cleanup complete!");
};
export default router;
