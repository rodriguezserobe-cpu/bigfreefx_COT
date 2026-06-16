import Header from "./components/Header";
import MarketSelector from "./components/MarketSelector";
import COTTable from "./components/COTTable";
import { useState } from "react";

function App() {
  const [market, setMarket] = useState("EUR");
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-10">
      <Header />
      <MarketSelector market={market} setMarket={setMarket} />
      <div className="max-w-7xl mx-auto">
        <p>Current Market: {market}</p>
        <COTTable market={market} />
      </div>
    </div>
  );
}

export default App;
