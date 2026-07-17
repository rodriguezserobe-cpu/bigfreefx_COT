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
import MarketScanner from "../../components/Dashboard/MarketScanner";

import { markets } from "../../data/markets";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [marketType, setMarketTypeState] = useState("FOREX");
  const [market, setMarket] = useState("EUR");

  const setMarketType = (type) => {
    setMarketTypeState(type);

    switch (type) {
      case "FOREX":
        setMarket("EUR");
        break;

      case "METALS":
        setMarket("XAU");
        break;

      case "INDICES":
        setMarket("US30");
        break;

      case "CRYPTO":
        setMarket("BTC");
        break;

      default:
        setMarket("EUR");
    }
  };
  const [group, setGroup] = useState("nonCommercial");

  const [search, setSearch] = useState("");
  const [cotData, setCotData] = useState({});
  const [allMarkets, setAllMarkets] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [marketType, market, group]);

  useEffect(() => {
    console.log("Frontend Group:", group);

    setLoading(true);

    // Clear previous market immediately
    setCotData({});

    fetch(
      `http://localhost:5000/api/cot/live?marketType=${marketType}&asset=${market}&group=${group}`,
    )
      .then((res) => res.json())
      .then((response) => {
        setCotData(response);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, [marketType, market, group]);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/cot/live?marketType=${marketType}&group=${group}`,
    )
      .then((res) => res.json())
      .then((response) => {
        setAllMarkets(response.latest || {});
      })
      .catch((err) => console.error(err));
  }, [marketType, group]);

  const latest = cotData?.latest?.[market];

  const chartData = (cotData?.history?.[market] || []).map((item) => ({
    date: new Date(item.reportDate).toLocaleDateString(),
    net: item.net,
  }));

  const marketName =
    markets.find((item) => item.code === market)?.name || market;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1b1b] to-[#111111] text-white">
      <Header
        search={search}
        setSearch={setSearch}
        setMarket={setMarket}
        user={user}
        latestDate={latest?.reportDate}
      />

      <Sidebar
        marketType={marketType}
        setMarketType={setMarketType}
        market={market}
        setMarket={setMarket}
        group={group}
        setGroup={setGroup}
      />

      <div className="ml-52 flex-1 overflow-y-auto px-8 pt-32 pb-8">
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto"></div>

              <p className="mt-4 text-sky-400 font-semibold text-lg">
                Updating COT Data...
              </p>
            </div>
          </div>
        ) : !latest ? (
          <div className="flex items-center justify-center h-[60vh] text-xl">
            Loading COT Data...
          </div>
        ) : (
          <>
            <SignalCard latest={latest} marketName={marketName} />

            <MarketInfoCard marketName={marketName} latest={latest} />

            <COTTable data={cotData?.history?.[market] || []} />

            <MarketScanner
              signals={cotData?.signals}
              marketType={marketType}
              asset={market}
            />

            <NetPositionChart data={chartData} />

            <WeeklyChangeCard history={cotData?.history?.[market] || []} />

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <StrengthRanking latest={allMarkets} />

              <WeaknessRanking latest={allMarkets} />
            </div>
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}
