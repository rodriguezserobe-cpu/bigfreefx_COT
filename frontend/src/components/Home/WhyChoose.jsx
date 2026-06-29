import {
  FaChartLine,
  FaGlobe,
  FaShieldAlt,
  FaUsers,
  FaDatabase,
  FaClock,
} from "react-icons/fa";

const features = [
  {
    icon: <FaDatabase />,
    title: "Simplified COT Reports",
    description:
      "We transform complex Commitment of Traders reports into clear and easy-to-read institutional data.",
  },
  {
    icon: <FaUsers />,
    title: "Institutional Positioning",
    description:
      "Track Commercials, Non-Commercials and Retail traders to understand market sentiment.",
  },
  {
    icon: <FaGlobe />,
    title: "Multi-Market Coverage",
    description:
      "Access Forex, Gold, Silver and Cryptocurrency COT analysis from one platform.",
  },
  {
    icon: <FaClock />,
    title: "Weekly Updates",
    description:
      "Fresh COT reports are uploaded every week after the official CFTC release.",
  },
  {
    icon: <FaChartLine />,
    title: "Professional Dashboard",
    description:
      "Use modern charts, rankings and market analysis tools designed for serious traders.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Members Only",
    description:
      "Premium institutional analysis is available exclusively to approved BigFree FX members.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-sky-400 font-semibold mb-4">
            Why Choose BigFree FX
          </p>

          <h2 className="text-5xl font-bold text-white mb-6">
            Built For Traders Who Follow
            <span className="text-sky-400"> Smart Money</span>
          </h2>

          <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-8">
            Our platform helps traders understand institutional market
            positioning through simplified Commitment of Traders analysis and
            professional trading tools.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-[#171B22] border border-sky-500/20 rounded-2xl p-8 hover:border-sky-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-3xl mb-6 group-hover:bg-sky-500 group-hover:text-white transition">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-8">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
