import axios from "axios";
import { saveHistory } from "./saveHistory.js";
import fs from "fs-extra";

export const fetchCFTCData = async () => {
  try {
    const response = await axios.get(
      "https://www.cftc.gov/dea/newcot/FinFutWk.txt",
    );

    const rows = response.data.split("\n");
    const matches = rows.filter(
      (row) =>
        row.includes("GOLD") ||
        row.includes("SILVER") ||
        row.includes("NASDAQ") ||
        row.includes("S&P") ||
        row.includes("DJIA"),
    );

    console.log(matches);

    const wantedMarkets = {
      "USD INDEX": "USD",
      "EURO FX": "EUR",
      "BRITISH POUND": "GBP",
      "JAPANESE YEN": "JPY",
      "AUSTRALIAN DOLLAR": "AUD",
      "CANADIAN DOLLAR": "CAD",
      "SWISS FRANC": "CHF",
      "NZ DOLLAR": "NZD",

      "GOLD: "XAU",
      "SILVER: "XAG",

      "E-MINI S&P 500 STOCK INDEX": "SPX",
      "E-MINI NASDAQ-100 STOCK INDEX": "NAS100",
      "DJIA x $5": "US30",
    };

    const result = {};

    rows.forEach((row) => {
      for (const marketName in wantedMarkets) {
        if (row.startsWith(`"${marketName} -`)) {
          const parts = row.split(",");

          const openInterest = Number(parts[7]);

          const long = Number(parts[11]);
          const short = Number(parts[12]);

          const changeLong = Number(parts[26]);
          const changeShort = Number(parts[27]);

          const net = long - short;

          const longPct = ((long / openInterest) * 100).toFixed(1);

          const shortPct = ((short / openInterest) * 100).toFixed(1);

          result[wantedMarkets[marketName]] = {
            date: parts[2],
            long,
            short,
            changeLong,
            changeShort,
            net,
            longPct: `${longPct}%`,
            shortPct: `${shortPct}%`,
            bias: net > 0 ? "Bullish" : "Bearish",
            openInterest,
          };
        }
      }
    });

    await saveHistory(result);

    const history = await fs.readJson("./data/cotHistory.json");

    return {
      success: true,
      latest: result,
      history,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
