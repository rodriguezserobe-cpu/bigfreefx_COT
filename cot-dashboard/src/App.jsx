import Header from "./components/Header";
import MarketSelector from "./components/MarketSelector";
import COTTable from "./components/COTTable";

function App() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white p-10">
      <Header />
      <MarketSelector />
      <COTTable />
    </div>
  );
}

export default App;
