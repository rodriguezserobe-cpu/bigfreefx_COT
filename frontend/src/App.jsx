import Header from "./components/Header";
import MarketSelector from "./components/MarketSelector";
import COTTable from "./components/COTTable";
import { useState, useEffect } from "react";
import { markets } from "./data/markets";
import MarketInfoCard from "./components/MarketInfoCard";
import NetPositionChart from "./components/NetPositionChart";
import SignalCard from "./components/SignalCard";
import Footer from "./components/Footer";

function App() {
  const [market, setMarket] = useState("EUR");
  const [cotData, setCotData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/cot/live")
      .then((res) => res.json())
      .then((response) => {
        console.log("API:", response);
        setCotData(response);
      })
      .catch((err) => console.error(err));
  }, []);

  const latest = cotData?.latest?.[market];
  console.log(latest);
  const chartData = [];

  const marketName =
    markets.find((item) => item.code === market)?.name || market;

  if (!latest) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        Loading COT Data...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1b1b] to-[#111111] text-white px-10 pt-36 pb-8">
      <Header />
      <MarketSelector market={market} setMarket={setMarket} />
      <SignalCard latest={latest} marketName={marketName} />

      <div className="w-full">
        <MarketInfoCard marketName={marketName} latest={latest} />
        <COTTable data={latest} />
      </div>

      <NetPositionChart data={chartData} />
      <Footer />
    </div>
  );
}

export default App;
