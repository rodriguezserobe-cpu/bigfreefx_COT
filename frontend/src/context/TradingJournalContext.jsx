import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/auth";

const TradingJournalContext = createContext();

export const TradingJournalProvider = ({ children }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("ALL");
  const [currency, setCurrency] = useState("ZAR");

  // Load currency from logged-in user's account
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

  // Change currency
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

  return (
    <TradingJournalContext.Provider
      value={{
        selectedPeriod,
        setSelectedPeriod,

        currency,
        changeCurrency,
      }}
    >
      {children}
    </TradingJournalContext.Provider>
  );
};

export const useTradingJournal = () => {
  return useContext(TradingJournalContext);
};
