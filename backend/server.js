import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api/cot", (req, res) => {
  res.json({
    EUR: [
      {
        date: "2022-12-20",
        long: 249149,
        short: 106877,
        changeLong: 12734,
        changeShort: -4823,
        longPct: "34.3%",
        shortPct: "14.7%",
        net: 999999,
      },
    ],

    GBP: [
      {
        date: "2022-12-20",
        long: 95120,
        short: 42000,
        changeLong: 5200,
        changeShort: -1500,
        longPct: "28.5%",
        shortPct: "12.1%",
        net: 53120,
      },
    ],

    GOLD: [
      {
        date: "2022-12-20",
        long: 180000,
        short: 70000,
        changeLong: 10000,
        changeShort: 2000,
        longPct: "40%",
        shortPct: "15%",
        net: 110000,
      },
    ],
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
