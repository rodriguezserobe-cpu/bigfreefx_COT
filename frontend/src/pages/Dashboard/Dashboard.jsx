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
  const [mobileOpen, setMobileOpen] = useState(false);

  // =========================================================
  // SELECTED COT REPORT
  // =========================================================
  // The newest report is selected automatically.
  // Clicking a table row changes this value.
  // =========================================================

  const [selectedReport, setSelectedReport] = useState(null);

  // =========================================================
  // SCROLL TO TOP ON INITIAL LOAD
  // =========================================================

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, []);

  // =========================================================
  // SCROLL TO TOP WHEN MARKET/GROUP CHANGES
  // =========================================================

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [marketType, market, group]);

  // =========================================================
  // LOAD SELECTED MARKET COT DATA
  // =========================================================

  useEffect(() => {
    console.log("Frontend Group:", group);

    setLoading(true);

    // Clear previous market data immediately
    setCotData({});

    // Clear selected report immediately
    setSelectedReport(null);

    fetch(
      `${import.meta.env.VITE_API_URL}/cot/live?marketType=${marketType}&asset=${market}&group=${group}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`COT request failed: ${res.status}`);
        }

        return res.json();
      })
      .then((response) => {
        setCotData(response);

        // =====================================================
        // SELECT LATEST REPORT BY DEFAULT
        // =====================================================

        const history = response?.history?.[market] || [];

        if (history.length > 0) {
          // history[0] is the newest report
          setSelectedReport(history[0]);
        } else {
          // Fallback to latest if history is unavailable
          setSelectedReport(response?.latest?.[market] || null);
        }
      })
      .catch((err) => {
        console.error("Failed to load COT data:", err);

        setCotData({});
        setSelectedReport(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [marketType, market, group]);

  // =========================================================
  // LOAD ALL MARKET DATA
  // =========================================================

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/cot/live?marketType=${marketType}&group=${group}`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(`COT markets request failed: ${res.status}`);
        }

        return res.json();
      })
      .then((response) => {
        setAllMarkets(response.latest || {});
      })
      .catch((err) => {
        console.error("Failed to load market rankings:", err);
      });
  }, [marketType, group]);

  // =========================================================
  // HISTORY
  // =========================================================

  const history = cotData?.history?.[market] || [];

  // =========================================================
  // SELECTED REPORT
  // =========================================================
  //
  // If the user clicks an older table row, that row becomes
  // the selected report.
  //
  // Otherwise the newest report is used.
  // =========================================================

  const latest = selectedReport || cotData?.latest?.[market];

  const selectedReportKey = selectedReport?.reportDate
    ? new Date(selectedReport.reportDate).toISOString().split("T")[0]
    : null;

  const selectedSignals = selectedReportKey
    ? cotData?.historicalSignals?.[selectedReportKey] || cotData?.signals
    : cotData?.signals;

  const selectedMarkets = selectedReportKey
    ? cotData?.historicalMarketData?.[selectedReportKey] || allMarkets
    : allMarkets;
  // =========================================================
  // CHART DATA
  // =========================================================

  const chartData = history.map((item) => ({
    date: new Date(item.reportDate).toLocaleDateString(),
    net: item.net,
  }));

  // =========================================================
  // MARKET NAME
  // =========================================================

  const marketName =
    markets.find((item) => item.code === market)?.name || market;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1b1b1b] to-[#111111] text-white">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header
        search={search}
        setSearch={setSearch}
        setMarket={setMarket}
        user={user}
        latestDate={latest?.reportDate}
        mobileOpen={mobileOpen}
        toggleSidebar={() => setMobileOpen(!mobileOpen)}
      />

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        marketType={marketType}
        setMarketType={setMarketType}
        market={market}
        setMarket={setMarket}
        group={group}
        setGroup={setGroup}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="flex-1 overflow-y-auto lg:ml-52 2xl:ml-72 px-4 sm:px-6 md:px-8 lg:px-8 2xl:px-12 pt-24 md:pt-28 lg:pt-32 pb-8">
        {/* ===================================================
            LOADING
        =================================================== */}

        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400 mx-auto" />

              <p className="mt-4 text-sky-400 font-semibold text-lg">
                Updating COT Data...
              </p>
            </div>
          </div>
        ) : !latest ? (
          /* =================================================
             NO DATA
          ================================================= */

          <div className="flex items-center justify-center h-[60vh] text-xl">
            Loading COT Data...
          </div>
        ) : (
          /* =================================================
             DASHBOARD DATA
          ================================================= */

          <>
            {/* =================================================
                BIGFREE FX SIGNAL

                This now changes when a table row is clicked.
            ================================================= */}

            <SignalCard latest={latest} marketName={marketName} />

            {/* =================================================
                MARKET INFO

                This also changes with the selected report.
            ================================================= */}

            <MarketInfoCard marketName={marketName} latest={latest} />

            {/* =================================================
                COT TABLE

                Clicking ANY row changes selectedReport.
            ================================================= */}

            <COTTable
              data={history}
              selectedReport={selectedReport}
              onSelectReport={setSelectedReport}
            />

            {/* =================================================
                MARKET SCANNER
            ================================================= */}

            <MarketScanner
              signals={selectedSignals}
              marketType={marketType}
              asset={market}
            />

            {/* =================================================
                NET POSITION CHART
            ================================================= */}
            <NetPositionChart
              data={chartData}
              selectedReportDate={selectedReport?.reportDate}
            />

            {/* =================================================
                WEEKLY POSITION CHANGE

                selectedReport is passed so this component
                can also respond to the selected table row.
            ================================================= */}

            <WeeklyChangeCard
              history={cotData?.history?.[market] || []}
              selectedReport={selectedReport}
            />

            {/* =================================================
                STRENGTH / WEAKNESS
            ================================================= */}

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <StrengthRanking latest={selectedMarkets} />

              <WeaknessRanking latest={selectedMarkets} />
            </div>
          </>
        )}

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <Footer />
      </div>
    </div>
  );
}
