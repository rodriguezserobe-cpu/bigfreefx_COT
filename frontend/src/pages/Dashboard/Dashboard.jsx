import { useEffect, useState } from "react";

import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import Footer from "../../components/Dashboard/Footer";

import SignalCard from "../../components/Dashboard/SignalCard";
import MarketInfoCard from "../../components/Dashboard/MarketInfoCard";
import COTTable from "../../components/Dashboard/COTTable";
import NetPositionChart from "../../components/Dashboard/NetPositionChart";
import WeeklyChangeCard from "../../components/Dashboard/WeeklyChangeCard";
import StrengthRanking from "../../components/Dashboard/StrengthRanking";
import WeaknessRanking from "../../components/Dashboard/WeaknessRanking";

import { markets } from "../../data/markets";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [market, setMarket] = useState("EUR");
  const [search, setSearch] = useState("");
  const [cotData, setCotData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/cot/live")
      .then((res) => res.json())
      .then((response) => {
        setCotData(response);
      })
      .catch((err) => console.error(err));
  }, []);

  const latest = cotData?.latest?.[market];

  const chartData = [...(cotData?.history?.[market] || [])].reverse();

  const marketName =
    markets.find((item) => item.code === market)?.name || market;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1b1b] to-[#111111] text-white">
      <Header
        search={search}
        setSearch={setSearch}
        setMarket={setMarket}
        user={user}
      />

      <Sidebar market={market} setMarket={setMarket} />

      <div className="ml-52 flex-1 overflow-y-auto px-8 pt-32 pb-8">
        {!latest ? (
          <div className="flex items-center justify-center h-[60vh] text-xl">
            Loading COT Data...
          </div>
        ) : (
          <>
            <SignalCard latest={latest} marketName={marketName} />

            <MarketInfoCard marketName={marketName} latest={latest} />

            <COTTable data={cotData?.history?.[market] || []} />

            <NetPositionChart data={chartData} />

            <WeeklyChangeCard history={cotData?.history?.[market] || []} />

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <StrengthRanking latest={cotData?.latest || {}} />

              <WeaknessRanking latest={cotData?.latest || {}} />
            </div>
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
