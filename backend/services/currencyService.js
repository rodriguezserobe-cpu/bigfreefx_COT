import axios from "axios";

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

export const convertTradeProfit = async ({
  amount,
  fromCurrency,
  toCurrency,
  tradeDate,
}) => {
  const value = Number(amount || 0);

  if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
    return value;
  }

  if (
    !SUPPORTED_CURRENCIES.includes(fromCurrency) ||
    !SUPPORTED_CURRENCIES.includes(toCurrency)
  ) {
    throw new Error("Unsupported currency");
  }

  const date = new Date(tradeDate);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid trade date");
  }

  const dateString = date.toISOString().slice(0, 10);

  const response = await axios.get(
    `https://api.frankfurter.app/${dateString}`,
    {
      params: {
        from: fromCurrency,
        to: toCurrency,
        amount: value,
      },
    },
  );

  return Number(response.data.rates[toCurrency] || 0);
};
