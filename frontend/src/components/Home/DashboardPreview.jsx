import report1 from "../../assets/preview/reports/report1.png";
import report2 from "../../assets/preview/reports/report2.png";
import report3 from "../../assets/preview/reports/report3.png";

import analysis1 from "../../assets/preview/analysis/analysis1.jpg";
import analysis2 from "../../assets/preview/analysis/analysis2.png";
import analysis3 from "../../assets/preview/analysis/analysis3.png";

import dashboard1 from "../../assets/preview/dashboard/dashboard1.jpg";
import dashboard2 from "../../assets/preview/dashboard/dashboard2.jpg";
import dashboard3 from "../../assets/preview/dashboard/dashboard3.png";

import ImageSlider from "./ImageSlider";

const cards = [
  {
    images: [report1, report2, report3],
    title: "Weekly COT Reports",
    description:
      "Access simplified Commitment of Traders reports updated weekly to understand institutional market positioning.",
    button: "Explore",
  },
  {
    images: [analysis1, analysis2, analysis3],
    title: "Institutional Analysis",
    description:
      "Analyze Commercials, Non-Commercials and Retail positioning before entering Forex and Gold trades.",
    button: "Learn More",
  },
  {
    images: [dashboard1, dashboard2, dashboard3],
    title: "Trading Dashboard",
    description:
      "Monitor Forex, Gold, Silver and Cryptocurrency markets from one professional dashboard.",
    button: "View Dashboard",
  },
];

export default function DashboardPreview() {
  return (
    <section id="preview" className="bg-[#0B1220] py-20 lg:py-28">
      <div className="max-w-7xl 2xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="text-center mb-12 lg:mb-16">
          <p className="uppercase tracking-[2px] sm:tracking-[4px] lg:tracking-[5px] text-sky-400 font-semibold mb-3 lg:mb-4 text-xs sm:text-sm">
            Explore Our Platform
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl font-bold text-white mb-5 lg:mb-6">
            Everything You Need For
            <span className="text-sky-400"> Institutional Trading</span>
          </h2>

          <p className="text-gray-400 text-base lg:text-lg max-w-3xl mx-auto leading-7 lg:leading-8 px-2">
            BigFree FX Trading simplifies Commitment of Traders analysis by
            transforming complex institutional data into clear market insights
            for Forex, Metals and Cryptocurrency traders.
          </p>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-[#171B22] rounded-2xl border border-sky-500/20 overflow-hidden shadow-xl hover:border-sky-500 hover:-translate-y-3 transition-all duration-500"
            >
              {/* Image */}

              <div className="overflow-hidden">
                <ImageSlider images={card.images} title={card.title} />
              </div>

              {/* Content */}

              <div className="p-5 sm:p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">
                  {card.title}
                </h3>

                <p className="text-gray-400 text-sm lg:text-base leading-7 lg:leading-8 mb-6 lg:mb-8">
                  {card.description}
                </p>

                <button className="w-full sm:w-auto px-8 py-3 rounded-lg border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition duration-300">
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
