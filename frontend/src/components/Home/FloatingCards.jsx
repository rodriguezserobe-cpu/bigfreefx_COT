import { FaChartLine, FaGlobe, FaBookOpen, FaBullseye } from "react-icons/fa";

const cards = [
  {
    icon: <FaChartLine />,
    title: "COT Analysis",
    text: "Analyze weekly Commitment of Traders data and understand institutional market positioning.",
  },
  {
    icon: <FaGlobe />,
    title: "Market Analysis",
    text: "Analyze Forex, Gold, Silver and other markets using positioning and market data.",
  },
  {
    icon: <FaBookOpen />,
    title: "Trading Journal",
    text: "Record your trades, review your setups, track profit and loss, and build better trading discipline.",
  },
  {
    icon: <FaBullseye />,
    title: "Goals & Performance",
    text: "Analyze your trading performance, use the trading calendar, and track your goals over time.",
  },
];
export default function FloatingCards() {
  return (
    <section className="relative z-20 mt-10 sm:mt-12 md:mt-16 lg:-mt-20 xl:-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="
                bg-[#171b22]
                rounded-2xl
                border
                border-sky-500/20
                p-6 md:p-8
                shadow-xl
                hover:-translate-y-3
                hover:border-sky-500
                hover:shadow-sky-500/20
                transition-all
                duration-300
                text-center
                sm:text-left
              "
            >
              <div className="text-sky-400 text-4xl mb-5 flex justify-center sm:justify-start">
                {card.icon}
              </div>

              <h3 className="text-white text-xl font-bold mb-3">
                {card.title}
              </h3>

              <p className="text-gray-400 leading-7 text-sm md:text-base">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
