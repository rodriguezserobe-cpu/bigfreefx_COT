import Header from "./components/Header";
import MarketSelector from "./components/MarketSelector";
import COTTable from "./components/COTTable";
import { useState } from "react";
import { cotData } from "./data/cotData";
import { markets } from "./data/markets";
import MarketInfoCard from "./components/MarketInfoCard";
import NetPositionChart from "./components/NetPositionChart";
import SignalCard from "./components/SignalCard";

function App() {
  const [market, setMarket] = useState("EUR");
  const latest = cotData[market]?.[0];
  const chartData = cotData[market];

  const marketName =
    markets.find((item) => item.code === market)?.name || market;
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1b1b] to-[#111111] text-white px-10 pt-36 pb-8">
      <Header />
      <MarketSelector market={market} setMarket={setMarket} />
      <SignalCard latest={latest} marketName={marketName} />

      <div className="w-full">
        <MarketInfoCard marketName={marketName} latest={latest} />
        <COTTable market={market} />
      </div>

      <NetPositionChart data={chartData} />
    </div>
  );
}

export default App;
