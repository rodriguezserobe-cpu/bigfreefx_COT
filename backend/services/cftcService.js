import COTReport from "../models/COTReport.js";

// ------------------------------
// Symbol aliases
// ------------------------------

const SYMBOL_ALIASES = {
  // Metals
  XAUUSD: ["GOLD", "GOLD, 100 TROY OZ"],
  GOLD: ["GOLD", "GOLD, 100 TROY OZ"],
  XAGUSD: ["SILVER", "SILVER, 5000 TROY OZ"],
  SILVER: ["SILVER", "SILVER, 5000 TROY OZ"],

  // Dollar Index
  DXY: ["USD INDEX"],
  USDINDEX: ["USD INDEX"],

  // Forex
  EURUSD: ["EURO FX"],
  GBPUSD: ["BRITISH POUND"],
  USDJPY: ["JAPANESE YEN"],
  AUDUSD: ["AUSTRALIAN DOLLAR"],
  NZDUSD: ["NZ DOLLAR"],
  USDCAD: ["CANADIAN DOLLAR"],
  USDCHF: ["SWISS FRANC"],
  // Indices
  US30: ["DJIA Consolidated"],
  DJ30: ["DJIA Consolidated"],

  SPX500: ["S&P 500 Consolidated"],
  SP500: ["S&P 500 Consolidated"],
  US500: ["S&P 500 Consolidated"],

  NAS100: ["NASDAQ-100 Consolidated"],
  US100: ["NASDAQ-100 Consolidated"],
  NASDAQ: ["NASDAQ-100 Consolidated"],
  // Crypto
  BTCUSD: ["BITCOIN"],
  BTC: ["BITCOIN"],
};
// Analyze COT Data
export const analyzeCOT = (report, symbol, group = "nonCommercial") => {
  if (!report) return null;

  const openInterest = Number(report.open_interest_all || 1);

  // -----------------------
  // Non Commercial
  // -----------------------
  const nonCommLong = Number(report.noncomm_positions_long_all || 0);
  const nonCommShort = Number(report.noncomm_positions_short_all || 0);

  // -----------------------
  // Commercial
  // -----------------------
  const commercialLong = Number(report.comm_positions_long_all || 0);
  const commercialShort = Number(report.comm_positions_short_all || 0);

  // -----------------------
  // Retail (Non Reportable)
  // -----------------------
  const retailLong = Number(report.nonrept_positions_long_all || 0);
  const retailShort = Number(report.nonrept_positions_short_all || 0);

  let long = nonCommLong;
  let short = nonCommShort;

  if (group === "commercial") {
    long = commercialLong;
    short = commercialShort;
  }

  if (group === "retail") {
    long = retailLong;
    short = retailShort;
  }

  let net = long - short;

  const invertPairs = ["USDJPY", "USDCAD", "USDCHF"];

  if (invertPairs.includes(symbol.toUpperCase())) {
    net *= -1;
  }

  const longPct = ((long / openInterest) * 100).toFixed(2);
  const shortPct = ((short / openInterest) * 100).toFixed(2);

  let bias = "Neutral";

  if (net > 20000) bias = "Bullish";
  if (net < -20000) bias = "Bearish";

  return {
    market: report.contract_market_name,
    reportDate: report.report_date_as_yyyy_mm_dd,
    openInterest,

    long,
    short,
    net,

    longPct,
    shortPct,

    bias,

    raw: report,
  };
};
// ==========================================
// FOREX PAIR STRENGTH CALCULATOR
// ==========================================

export const calculatePairSignal = (symbol, currencyScores) => {
  // Valid Forex currencies
  const FOREX_CURRENCIES = [
    "EUR",
    "GBP",
    "USD",
    "JPY",
    "AUD",
    "NZD",
    "CAD",
    "CHF",
  ];

  const base = symbol.substring(0, 3).toUpperCase();
  const quote = symbol.substring(3, 6).toUpperCase();

  const isForex =
    FOREX_CURRENCIES.includes(base) && FOREX_CURRENCIES.includes(quote);

  // -------- FOREX --------
  if (isForex) {
    const baseScore = currencyScores[base] ?? 0;
    const quoteScore = currencyScores[quote] ?? 0;

    const strength = Number((baseScore - quoteScore).toFixed(2));

    let signal = "HOLD";
    let confidence = "Weak";

    if (strength >= 60) {
      signal = "STRONG BUY";
      confidence = "Very Strong";
    } else if (strength >= 30) {
      signal = "BUY";
      confidence = "Strong";
    } else if (strength >= 15) {
      signal = "BUY";
      confidence = "Moderate";
    } else if (strength <= -60) {
      signal = "STRONG SELL";
      confidence = "Very Strong";
    } else if (strength <= -30) {
      signal = "SELL";
      confidence = "Strong";
    } else if (strength <= -15) {
      signal = "SELL";
      confidence = "Moderate";
    }

    return {
      symbol,
      type: "FOREX",
      base,
      quote,
      baseScore,
      quoteScore,
      strength,
      signal,
      confidence,
    };
  }

  // -------- METALS / INDICES / CRYPTO --------

  const score = currencyScores[symbol] ?? 0;

  let signal = "HOLD";
  let confidence = "Weak";

  if (score >= 60) {
    signal = "STRONG BUY";
    confidence = "Very Strong";
  } else if (score >= 30) {
    signal = "BUY";
    confidence = "Strong";
  } else if (score >= 15) {
    signal = "BUY";
    confidence = "Moderate";
  } else if (score <= -60) {
    signal = "STRONG SELL";
    confidence = "Very Strong";
  } else if (score <= -30) {
    signal = "SELL";
    confidence = "Strong";
  } else if (score <= -15) {
    signal = "SELL";
    confidence = "Moderate";
  }

  return {
    symbol,
    type: "MARKET",
    strength: Number(score.toFixed(2)),
    signal,
    confidence,
  };
};

export const calculateAllForexPairs = (currencyScores) => {
  const pairs = [
    "EURUSD",
    "GBPUSD",
    "AUDUSD",
    "NZDUSD",
    "USDCAD",
    "USDCHF",
    "USDJPY",

    "EURGBP",
    "EURAUD",
    "EURNZD",
    "EURCAD",
    "EURCHF",
    "EURJPY",

    "GBPAUD",
    "GBPNZD",
    "GBPCAD",
    "GBPCHF",
    "GBPJPY",

    "AUDNZD",
    "AUDCAD",
    "AUDCHF",
    "AUDJPY",

    "NZDCAD",
    "NZDCHF",
    "NZDJPY",

    "CADCHF",
    "CADJPY",

    "CHFJPY",
  ];

  return pairs.map((pair) => calculatePairSignal(pair, currencyScores));
};
// ==========================================
// BUILD ALL MARKET SIGNALS
// ==========================================

export const calculateAllMarketSignals = (currencyScores) => {
  return {
    forex: calculateAllForexPairs(currencyScores),

    metals: [
      calculatePairSignal("XAU", currencyScores),
      calculatePairSignal("XAG", currencyScores),
    ].filter(Boolean),

    indices: [
      calculatePairSignal("US30", currencyScores),
      calculatePairSignal("NAS100", currencyScores),
      calculatePairSignal("SPX500", currencyScores),
    ].filter(Boolean),

    crypto: [calculatePairSignal("BTC", currencyScores)].filter(Boolean),
  };
};
// ==========================================
// BUILD CURRENCY SCORES FROM COT
// ==========================================

const MARKET_TO_CURRENCY = {
  // Forex
  "EURO FX": "EUR",
  "BRITISH POUND": "GBP",
  "JAPANESE YEN": "JPY",
  "SWISS FRANC": "CHF",
  "CANADIAN DOLLAR": "CAD",
  "AUSTRALIAN DOLLAR": "AUD",
  "NEW ZEALAND DOLLAR": "NZD",
  "NZ DOLLAR": "NZD",
  "USD INDEX": "USD",
  "U.S. DOLLAR INDEX": "USD",

  // Metals
  GOLD: "XAU",
  SILVER: "XAG",

  // Indices
  "DJIA x $5": "US30",
  "E-MINI S&P 500": "SPX500",
  "NASDAQ MINI": "NAS100",
  "NASDAQ-100 Consolidated": "NAS100",
  "MICRO E-MINI NASDAQ-100 INDEX": "NAS100",

  // Crypto
  BITCOIN: "BTC",
  "MICRO BITCOIN": "BTC",
};

export const buildCurrencyScores = (cotData, group = "nonCommercial") => {
  const rawScores = {};

  cotData.forEach((market) => {
    const currency = MARKET_TO_CURRENCY[market.contract_market_name];

    if (!currency) return;

    let long = 0;
    let short = 0;

    if (group === "nonCommercial") {
      long = Number(market.noncomm_positions_long_all || 0);
      short = Number(market.noncomm_positions_short_all || 0);
    } else if (group === "commercial") {
      long = Number(market.comm_positions_long_all || 0);
      short = Number(market.comm_positions_short_all || 0);
    } else if (group === "retail") {
      long = Number(market.nonrept_positions_long_all || 0);
      short = Number(market.nonrept_positions_short_all || 0);
    }

    const openInterest = Number(market.open_interest_all || 1);

    const net = long - short;

    const normalized = (net / openInterest) * 100;

    rawScores[currency] = normalized;
  });

  const maxAbs = Math.max(
    ...Object.values(rawScores).map((value) => Math.abs(value)),
    1,
  );

  const scores = {};

  Object.entries(rawScores).forEach(([currency, value]) => {
    scores[currency] = Number(((value / maxAbs) * 100).toFixed(2));
  });
  console.log("Currency Scores for", group, scores);

  return scores;
};
// ==========================================
// PART 5 - ADVANCED CURRENCY SCORING
// ==========================================

export const calculateAdvancedCurrencyScores = (cotData) => {
  const scores = {};

  cotData.forEach((market) => {
    const currency = MARKET_TO_CURRENCY[market.contract_market_name];

    if (!currency) return;

    const openInterest = Number(market.open_interest_all || 1);

    // Non-Commercials (Speculators)
    const nonCommLong = Number(market.noncomm_positions_long_all || 0);
    const nonCommShort = Number(market.noncomm_positions_short_all || 0);

    // Commercials (Smart Money)
    const commLong = Number(market.comm_positions_long_all || 0);
    const commShort = Number(market.comm_positions_short_all || 0);

    // Weekly Changes
    const changeNonCommLong = Number(market.change_in_noncomm_long_all || 0);
    const changeNonCommShort = Number(market.change_in_noncomm_short_all || 0);

    // Net Positions
    const specNet = nonCommLong - nonCommShort;
    const smartMoneyNet = commLong - commShort;
    const weeklyFlow = changeNonCommLong - changeNonCommShort;

    // Normalize
    const specScore = (specNet / openInterest) * 100;
    const smartMoneyScore = (smartMoneyNet / openInterest) * 100;
    const flowScore = (weeklyFlow / openInterest) * 100;

    // Weighted Score
    const finalScore =
      specScore * 0.5 + smartMoneyScore * 0.3 + flowScore * 0.2;

    scores[currency] = Number(finalScore.toFixed(2));
  });

  return scores;
};
// ==========================================
// FETCH LATEST CFTC WEEK ONLY
// ==========================================

export const fetchCFTCData = async () => {
  // Step 1: Get the newest report date
  const latestResponse = await fetch(
    "https://publicreporting.cftc.gov/resource/6dca-aqww.json?$select=report_date_as_yyyy_mm_dd&$order=report_date_as_yyyy_mm_dd DESC&$limit=1",
  );

  if (!latestResponse.ok) {
    throw new Error("Failed to fetch latest report date.");
  }

  const latest = await latestResponse.json();

  const latestDate = latest[0].report_date_as_yyyy_mm_dd;

  console.log("Latest CFTC report:", latestDate);

  // Step 2: Fetch ONLY that week's reports
  const reportResponse = await fetch(
    `https://publicreporting.cftc.gov/resource/6dca-aqww.json?report_date_as_yyyy_mm_dd=${latestDate}`,
  );

  if (!reportResponse.ok) {
    throw new Error("Failed to fetch latest COT report.");
  }

  const data = await reportResponse.json();

  console.log(`Downloaded ${data.length} reports`);

  return data;
};
// ==========================================
// BUILD LIVE DASHBOARD DATA
// ==========================================

export const buildLiveCOTData = async ({ marketType, asset, group } = {}) => {
  console.log("Selected Group:", group);
  const data = await fetchCFTCData();

  // Keep only supported BigFree FX markets
  const filteredData = data.filter(
    (report) => MARKET_TO_CURRENCY[report.contract_market_name],
  );

  // Sort newest → oldest
  filteredData.sort(
    (a, b) =>
      new Date(b.report_date_as_yyyy_mm_dd) -
      new Date(a.report_date_as_yyyy_mm_dd),
  );

  const latest = {};
  const history = {};

  filteredData.forEach((report) => {
    const currency = MARKET_TO_CURRENCY[report.contract_market_name];

    if (!currency) return;

    // If an asset was selected, only process that asset
    if (asset && currency !== asset) return;

    const analysis = analyzeCOT(report, currency, group);

    if (!analysis) return;

    if (!history[currency]) {
      history[currency] = [];
    }

    history[currency].push(analysis);

    if (
      !latest[currency] ||
      new Date(analysis.reportDate) > new Date(latest[currency].reportDate)
    ) {
      latest[currency] = analysis;
    }
  });

  Object.keys(history).forEach((currency) => {
    history[currency].sort(
      (a, b) => new Date(b.reportDate) - new Date(a.reportDate),
    );
  });

  const currencyScores = buildCurrencyScores(filteredData, group);

  const signals = calculateAllMarketSignals(currencyScores);
  return {
    latest,
    history,
    signals,
    marketType,
    asset,
    group,
  };
};

// ==========================================
// SAVE LATEST REPORTS TO MONGODB
// ==========================================

export const saveLatestReportsToDB = async () => {
  const data = await fetchCFTCData();

  // Get the newest report date
  const latestDate = data.reduce((latest, report) => {
    return new Date(report.report_date_as_yyyy_mm_dd) > new Date(latest)
      ? report.report_date_as_yyyy_mm_dd
      : latest;
  }, data[0].report_date_as_yyyy_mm_dd);

  // Latest week's reports
  const latestReports = data.filter(
    (report) => report.report_date_as_yyyy_mm_dd === latestDate,
  );

  // Markets supported by BigFree FX
  const ALLOWED_MARKETS = [
    "EURO FX",
    "BRITISH POUND",
    "JAPANESE YEN",
    "AUSTRALIAN DOLLAR",
    "NZ DOLLAR",
    "CANADIAN DOLLAR",
    "SWISS FRANC",

    "GOLD",
    "SILVER",

    "USD INDEX",

    "DJIA x $5",
    "E-MINI S&P 500",
    "NASDAQ-100 Consolidated",
    "NASDAQ MINI",
    "MICRO E-MINI NASDAQ-100 INDEX",

    "BITCOIN",
    "MICRO BITCOIN",
  ];

  const filteredReports = latestReports.filter((report) =>
    ALLOWED_MARKETS.includes(report.contract_market_name),
  );

  console.log("===== BIGFREE FX MARKETS =====");

  filteredReports.forEach((report) => {
    console.log(report.contract_market_name);
  });

  console.log(
    `Found ${filteredReports.length} BigFree FX markets for latest report (${latestDate})`,
  );

  return filteredReports;
};
