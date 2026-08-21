import express from "express";
import { convertTradeProfit } from "../services/currencyService.js";

const router = express.Router();

const SUPPORTED_CURRENCIES = [
  "ZAR",
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "NZD",
  "LSL",
];

// ==========================================
// GET EXCHANGE RATES
// ==========================================
router.get("/", async (req, res) => {
  try {
    const base = (req.query.base || "ZAR").toUpperCase();
    const date = req.query.date;

    if (!SUPPORTED_CURRENCIES.includes(base)) {
      return res.status(400).json({
        success: false,
        message: "Unsupported base currency",
      });
    }

    let url = `https://api.frankfurter.app/latest?from=${base}`;

    if (date) {
      url = `https://api.frankfurter.app/${date}?from=${base}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Exchange rate service unavailable");
    }

    const data = await response.json();

    const rates = {
      [base]: 1,
      ...(data.rates || {}),
    };

    // ZAR and LSL are pegged 1:1
    if (base === "ZAR") {
      rates.LSL = 1;
    }

    if (base === "LSL") {
      rates.ZAR = 1;
    }

    res.json({
      success: true,
      base,
      rates,
      date: data.date,
      historical: Boolean(date),
    });
  } catch (error) {
    console.error("Exchange rate error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load exchange rates.",
    });
  }
});

// ==========================================
// CONVERT TRADE PROFIT
// ==========================================
router.get("/convert", async (req, res) => {
  try {
    const amount = Number(req.query.amount);
    const fromCurrency = (req.query.from || "").toUpperCase();
    const toCurrency = (req.query.to || "").toUpperCase();
    const tradeDate = req.query.date;

    if (!Number.isFinite(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount.",
      });
    }

    if (!fromCurrency || !toCurrency || !tradeDate) {
      return res.status(400).json({
        success: false,
        message: "Amount, from, to and date are required.",
      });
    }

    const convertedAmount = await convertTradeProfit({
      amount,
      fromCurrency,
      toCurrency,
      tradeDate,
    });

    res.json({
      success: true,
      amount,
      from: fromCurrency,
      to: toCurrency,
      date: tradeDate,
      convertedAmount,
    });
  } catch (error) {
    console.error("Currency conversion error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to convert currency.",
    });
  }
});

export default router;
