import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import API from "../api/auth";

const TradingJournalContext = createContext();

export const TradingJournalProvider = ({ children }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("ALL");
  const [currency, setCurrency] = useState("ZAR");

  const [exchangeRates, setExchangeRates] = useState({});
  const [historicalRates, setHistoricalRates] = useState({});
  const [ratesLoading, setRatesLoading] = useState(false);

  // ================================
  // LOAD USER CURRENCY
  // ================================

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const { data } = await API.get("/user/profile");

        setCurrency(data?.user?.currency || "ZAR");
      } catch (error) {
        console.error("Failed to load user currency:", error);
        setCurrency("ZAR");
      }
    };

    fetchCurrency();
  }, []);

  // ================================
  // LOAD CURRENT EXCHANGE RATES
  // ================================

  const fetchExchangeRates = useCallback(async (base = "ZAR") => {
    try {
      setRatesLoading(true);

      const { data } = await API.get(`/exchange-rates?base=${base}`);

      if (data?.success) {
        setExchangeRates(data.rates || {});
      }

      return data?.rates || null;
    } catch (error) {
      console.error("Failed to load exchange rates:", error);
      return null;
    } finally {
      setRatesLoading(false);
    }
  }, []);

  // ================================
  // LOAD INITIAL ZAR RATES
  // ================================

  useEffect(() => {
    fetchExchangeRates("ZAR");
  }, [fetchExchangeRates]);

  // ================================
  // CURRENT CURRENCY CONVERSION
  // ================================

  const convertCurrency = useCallback(
    (amount, fromCurrency, toCurrency = currency) => {
      const value = Number(amount) || 0;

      if (!fromCurrency || !toCurrency) {
        return value;
      }

      if (fromCurrency === toCurrency) {
        return value;
      }

      // ZAR and LSL are treated as 1:1
      if (
        (fromCurrency === "ZAR" && toCurrency === "LSL") ||
        (fromCurrency === "LSL" && toCurrency === "ZAR")
      ) {
        return value;
      }

      const fromRate =
        fromCurrency === "ZAR"
          ? 1
          : fromCurrency === "LSL"
            ? 1
            : exchangeRates[fromCurrency];

      const toRate =
        toCurrency === "ZAR"
          ? 1
          : toCurrency === "LSL"
            ? 1
            : exchangeRates[toCurrency];

      if (!fromRate || !toRate) {
        return value;
      }

      const amountInZAR = value / fromRate;

      return amountInZAR * toRate;
    },
    [currency, exchangeRates],
  );

  // ================================
  // LOAD HISTORICAL RATES
  // ================================

  const fetchHistoricalRates = useCallback(
    async (base, date) => {
      if (!base || !date) return null;

      const key = `${date}_${base}`;

      if (historicalRates[key]) {
        return historicalRates[key];
      }

      try {
        const { data } = await API.get(
          `/exchange-rates?base=${base}&date=${date}`,
        );

        if (data?.success) {
          const rates = data.rates || {};

          setHistoricalRates((prev) => ({
            ...prev,
            [key]: rates,
          }));

          return rates;
        }
      } catch (error) {
        console.error(
          `Failed to load historical rates for ${base} on ${date}:`,
          error,
        );
      }

      return null;
    },
    [historicalRates],
  );

  // ================================
  // HISTORICAL CURRENCY CONVERSION
  // ================================

  const convertHistoricalCurrency = useCallback(
    async (amount, fromCurrency, toCurrency, date) => {
      const value = Number(amount) || 0;

      if (!fromCurrency || !toCurrency) {
        return value;
      }

      if (fromCurrency === toCurrency) {
        return value;
      }

      if (!date) {
        return value;
      }

      // ZAR and LSL are treated as 1:1
      if (
        (fromCurrency === "ZAR" && toCurrency === "LSL") ||
        (fromCurrency === "LSL" && toCurrency === "ZAR")
      ) {
        return value;
      }

      try {
        const formattedDate = new Date(date).toISOString().slice(0, 10);

        // Historical rates always use ZAR as the base
        const rates = await fetchHistoricalRates("ZAR", formattedDate);

        if (!rates) {
          return value;
        }

        const fromRate =
          fromCurrency === "ZAR"
            ? 1
            : fromCurrency === "LSL"
              ? 1
              : rates[fromCurrency];

        const toRate =
          toCurrency === "ZAR"
            ? 1
            : toCurrency === "LSL"
              ? 1
              : rates[toCurrency];

        if (!fromRate || !toRate) {
          console.warn("Currency rate missing:", {
            fromCurrency,
            toCurrency,
            fromRate,
            toRate,
          });

          return value;
        }

        const amountInZAR = value / fromRate;

        return amountInZAR * toRate;
      } catch (error) {
        console.error("Historical currency conversion failed:", error);

        return value;
      }
    },
    [fetchHistoricalRates],
  );

  // ================================
  // CHANGE JOURNAL CURRENCY
  // ================================

  const changeCurrency = async (newCurrency) => {
    try {
      const { data } = await API.put("/user/currency", {
        currency: newCurrency,
      });

      setCurrency(data.currency);
    } catch (error) {
      console.error("Currency update failed:", error);
    }
  };

  // ================================
  // PROVIDER
  // ================================

  return (
    <TradingJournalContext.Provider
      value={{
        selectedPeriod,
        setSelectedPeriod,

        currency,
        changeCurrency,

        exchangeRates,
        historicalRates,

        fetchExchangeRates,
        fetchHistoricalRates,

        // Both are available now
        convertCurrency,
        convertHistoricalCurrency,

        ratesLoading,
      }}
    >
      {children}
    </TradingJournalContext.Provider>
  );
};

export const useTradingJournal = () => {
  return useContext(TradingJournalContext);
};
