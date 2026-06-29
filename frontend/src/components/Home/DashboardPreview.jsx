import preview1 from "../../assets/image2.png";
import preview2 from "../../assets/image3.png";
import trading from "../../assets/image4.png";

const cards = [
  {
    image: preview1,
    title: "Weekly COT Reports",
    description:
      "Access simplified Commitment of Traders reports updated weekly to understand institutional market positioning.",
    button: "Explore",
  },
  {
    image: preview2,
    title: "Institutional Analysis",
    description:
      "Analyze Commercials, Non-Commercials and Retail positioning before entering Forex and Gold trades.",
    button: "Learn More",
  },
  {
    image: trading,
    title: "Trading Dashboard",
    description:
      "Monitor Forex, Gold, Silver and Cryptocurrency markets from one professional dashboard.",
    button: "View Dashboard",
  },
];

export default function DashboardPreview() {
  return (
    <section className="bg-[#0B1220] py-28">
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading */}

        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-sky-400 font-semibold mb-4">
            Explore Our Platform
          </p>

          <h2 className="text-5xl font-bold text-white mb-6">
            Everything You Need For
            <span className="text-sky-400"> Institutional Trading</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-8">
            BigFree FX Trading simplifies Commitment of Traders analysis by
            transforming complex institutional data into clear market insights
            for Forex, Metals and Cryptocurrency traders.
          </p>
        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-[#171B22] rounded-2xl border border-sky-500/20 overflow-hidden shadow-xl hover:border-sky-500 hover:-translate-y-3 transition-all duration-500"
            >
              {/* Image */}

              <div className="overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              {/* Content */}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {card.title}
                </h3>

                <p className="text-gray-400 leading-8 mb-8">
                  {card.description}
                </p>

                <button className="px-8 py-3 rounded-lg border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition duration-300">
                  {card.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
