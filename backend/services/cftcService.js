import axios from "axios";
import { saveHistory } from "./saveHistory.js";
import fs from "fs-extra";

export const fetchCFTCData = async () => {
  try {
    const response = await axios.get(
      "https://www.cftc.gov/dea/newcot/FinFutWk.txt",
    );

    const rows = response.data.split("\n");

    console.log("Total rows:", rows.length);

    rows.slice(0, 20).forEach((row) => console.log(row));

    const wantedMarkets = {
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
