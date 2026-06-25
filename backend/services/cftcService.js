import axios from "axios";
import { saveHistory } from "./saveHistory.js";
import fs from "fs-extra";

export const fetchCFTCData = async () => {
  try {
    // Financial Futures Report
    const financialResponse = await axios.get(
      "https://www.cftc.gov/dea/newcot/FinFutWk.txt",
    );

    // Commodity Futures Report (Gold, Silver, etc.)
    //const metalsResponse = await axios.get(
    // "https://www.cftc.gov/dea/newcot/ComFutWk.txt",
    //);

    const financialRows = financialResponse.data.split("\n");
    //const metalsRows = metalsResponse.data.split("\n");

    const financialMarkets = {
      "U.S. DOLLAR INDEX": "USD",
      "USD INDEX": "USD",

      "EURO FX": "EUR",
      "BRITISH POUND": "GBP",
      "JAPANESE YEN": "JPY",
      "AUSTRALIAN DOLLAR": "AUD",
      "CANADIAN DOLLAR": "CAD",
      "SWISS FRANC": "CHF",
      "NZ DOLLAR": "NZD",

      "DJIA Consolidated": "US30",
      "S&P 500 Consolidated": "SPX500",
      "NASDAQ-100 Consolidated": "NAS100",

      BITCOIN: "BTC",
      "ETHER CASH SETTLED": "ETH",
      XRP: "XRP",
      SOL: "SOL",
    };

    /*const metalsMarkets = {
      GOLD: "XAU",
      SILVER: "XAG",
    };*/

    const result = {};

    // ==========================
    // FINANCIAL MARKETS
    // ==========================
    financialRows.forEach((row) => {
      for (const marketName in financialMarkets) {
        if (row.startsWith(`"${marketName} -`)) {
          const parts = row.split(",");
          if (marketName === "EURO FX") {
            console.log("EURO FX ROW:");
            console.log(parts);
          }

          const openInterest = Number(parts[7]);

          const long = Number(parts[11]);
          const short = Number(parts[12]);

          const changeLong = Number(parts[26]);
          const changeShort = Number(parts[27]);

          const net = long - short;

          const longPct = ((long / openInterest) * 100).toFixed(1);
          const shortPct = ((short / openInterest) * 100).toFixed(1);

          result[financialMarkets[marketName]] = {
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

    // ==========================
    // METALS (GOLD & SILVER)
    // ==========================
    /*metalsRows.forEach((row) => {
      for (const marketName in metalsMarkets) {
        if (row.includes(marketName)) {
          console.log("FOUND METAL:", row);

          const parts = row.split(",");

          const openInterest = Number(parts[7]);

          const long = Number(parts[11]);
          const short = Number(parts[12]);

          const changeLong = Number(parts[26]);
          const changeShort = Number(parts[27]);

          const net = long - short;

          const longPct = ((long / openInterest) * 100).toFixed(1);
          const shortPct = ((short / openInterest) * 100).toFixed(1);

          result[metalsMarkets[marketName]] = {
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
    });*/

    console.log("Markets loaded:", Object.keys(result));

    await saveHistory(result);

    const history = await fs.readJson("./data/cotHistory.json");

    return {
      success: true,
      latest: result,
      history,
    };
  } catch (error) {
    console.error("CFTC Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};
