import fs from "fs-extra";

const HISTORY_FILE = "./data/cotHistory.json";

export const saveHistory = async (latestData) => {
  try {
    const history = await fs.readJson(HISTORY_FILE);

    for (const market in latestData) {
      if (!history[market]) {
        history[market] = [];
      }

      const latestReport = latestData[market];

      const exists = history[market].some(
        (item) => item.date === latestReport.date,
      );

      if (!exists) {
        history[market].unshift(latestReport);

        history[market] = history[market].slice(0, 10);
      }
    }

    await fs.writeJson(HISTORY_FILE, history, { spaces: 2 });

    return history;
  } catch (error) {
    console.error("History save error:", error);
    return null;
  }
};
