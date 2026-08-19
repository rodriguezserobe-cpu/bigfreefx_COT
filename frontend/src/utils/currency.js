const currencySymbols = {
  ZAR: "R",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  NZD: "NZ$",
  LSL: "M",
};

export const formatMoney = (amount, currency = "ZAR") => {
  const symbol = currencySymbols[currency] || currency;

  const value = Number(amount) || 0;

  return `${symbol}${value.toFixed(2)}`;
};

export const getCurrencySymbol = (currency = "ZAR") => {
  return currencySymbols[currency] || currency;
};
