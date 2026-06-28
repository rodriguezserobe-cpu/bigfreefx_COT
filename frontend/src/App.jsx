import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*import Header from "./components/Dashboard/Header";
import COTTable from "./components/Dashboard/COTTable";
import { useState, useEffect } from "react";
import { markets } from "./data/markets";
import MarketInfoCard from "./components/Dashboard/MarketInfoCard";
import NetPositionChart from "./components/Dashboard/NetPositionChart";
import SignalCard from "./components/Dashboard/SignalCard";
import Footer from "./components/Dashboard/Footer";
import WeeklyChangeCard from "./components/Dashboard/WeeklyChangeCard";
import StrengthRanking from "./components/Dashboard/StrengthRanking";
import WeaknessRanking from "./components/Dashboard/WeaknessRanking";
import Sidebar from "./components/Dashboard/Sidebar";

function App() {
  const [market, setMarket] = useState("EUR");
  const [cotData, setCotData] = useState({});
  const [search, setSearch] = useState("");

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

  // Chart data oldest -> newest
  const chartData = [...(cotData?.history?.[market] || [])].reverse();

  console.log("CHART DATA:", chartData);

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
    <div className="min-h-screen bg-gradient-to-b from-[#1b1b1b] to-[#111111] text-white px-4 md:px-10 pt-24 md:pt-36 pb-8">
      <Header search={search} setSearch={setSearch} setMarket={setMarket} />

      <Sidebar market={market} setMarket={setMarket} />

      <div className="ml-52 flex-1 overflow-y-auto px-8 pt-4 pb-8">
        <SignalCard latest={latest} marketName={marketName} />
        <MarketInfoCard marketName={marketName} latest={latest} />

        <COTTable data={cotData?.history?.[market] || []} />
        <NetPositionChart data={chartData} />

        <WeeklyChangeCard history={cotData?.history?.[market] || []} />

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <StrengthRanking latest={cotData?.latest || {}} />
          <WeaknessRanking latest={cotData?.latest || {}} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
*/
