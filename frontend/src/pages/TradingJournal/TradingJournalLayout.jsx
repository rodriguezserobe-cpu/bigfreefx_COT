import { Outlet } from "react-router-dom";
import { TradingJournalProvider } from "../../context/TradingJournalContext";

const TradingJournalLayout = () => {
  return (
    <TradingJournalProvider>
      <Outlet />
    </TradingJournalProvider>
  );
};

export default TradingJournalLayout;
