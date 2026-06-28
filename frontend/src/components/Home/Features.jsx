import {
  BarChart3,
  TrendingUp,
  Coins,
  Bitcoin,
  ShieldCheck,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: <BarChart3 size={40} />,
    title: "Weekly COT Reports",
    description:
      "Receive updated institutional Commitment of Traders reports every week.",
  },
  {
    icon: <TrendingUp size={40} />,
    title: "Smart Money Analysis",
    description:
      "Follow Commercials, Managed Money and institutional positioning.",
  },
  {
    icon: <Coins size={40} />,
    title: "Gold & Silver",
    description:
      "Professional analysis for XAUUSD and XAGUSD based on COT data.",
  },
  {
    icon: <Bitcoin size={40} />,
    title: "Crypto Markets",
    description:
      "Track Bitcoin, Ethereum, XRP and SOL institutional sentiment.",
  },
  {
    icon: <Globe size={40} />,
    title: "Forex Markets",
    description:
      "EUR, GBP, USD, AUD, NZD, CAD, CHF and JPY institutional reports.",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Premium Dashboard",
    description:
      "Access rankings, charts, market bias and weekly changes in one place.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-[#111111] py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">Why BigFree FX?</h2>

        <p className="text-gray-400 text-center mb-16">
          Everything you need to trade alongside institutional money.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1b1b1b] border border-sky-500/10 rounded-2xl p-8 hover:border-sky-500 transition duration-300 hover:-translate-y-2"
            >
              <div className="text-sky-400 mb-6">{feature.icon}</div>

              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>

              <p className="text-gray-400 leading-7">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
