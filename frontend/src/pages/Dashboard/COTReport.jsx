import { useEffect, useState } from "react";

import {
  calculateAdvancedCurrencyScores,
  calculateAllForexPairs,
} from "../../services/cftcService";

const COTReport = () => {
  const [loading, setLoading] = useState(true);
  const [, setCotData] = useState([]);
  const [currencyScores, setCurrencyScores] = useState({});
  const [forexSignals, setForexSignals] = useState([]);

  const loadCOTData = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/cot`);

      if (!response.ok) {
        throw new Error("Failed to load COT data");
      }

      const data = await response.json();

      setCotData(data);

      const scores = calculateAdvancedCurrencyScores(data);
      setCurrencyScores(scores);

      const pairs = calculateAllForexPairs(scores);
      setForexSignals(pairs);
    } catch (error) {
      console.error("Error loading COT data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCOTData();
  }, []);

  if (loading) {
    return <h2>Loading COT Report...</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Advanced COT Forex Strength Meter
      </h1>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Pair</th>
            <th className="border p-2">Base Score</th>
            <th className="border p-2">Quote Score</th>
            <th className="border p-2">Strength</th>
            <th className="border p-2">Signal</th>
          </tr>
        </thead>

        <tbody>
          {forexSignals.map((pair) => (
            <tr key={pair.pair}>
              <td className="border p-2 font-semibold">{pair.pair}</td>
              <td className="border p-2">{pair.baseScore.toFixed(2)}</td>
              <td className="border p-2">{pair.quoteScore.toFixed(2)}</td>
              <td className="border p-2 font-bold">
                {pair.strength.toFixed(2)}
              </td>
              <td
                className={`border p-2 font-bold ${
                  pair.signal === "BUY"
                    ? "text-green-600"
                    : pair.signal === "SELL"
                      ? "text-red-600"
                      : "text-yellow-600"
                }`}
              >
                {pair.signal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Currency Scores</h2>

        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Currency</th>
              <th className="border p-2">Score</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(currencyScores).map(([currency, score]) => (
              <tr key={currency}>
                <td className="border p-2 font-semibold">{currency}</td>
                <td className="border p-2">{score.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default COTReport;
