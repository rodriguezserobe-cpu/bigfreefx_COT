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
    <section className="py-20 lg:py-28 bg-[#111111]">
      <div className="max-w-7xl 2xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="text-center mb-12 lg:mb-16">
          <p className="uppercase tracking-[2px] sm:tracking-[4px] lg:tracking-[5px] text-sky-400 font-semibold mb-3 lg:mb-4 text-xs sm:text-sm">
            Why Choose BigFree FX
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl 2xl:text-6xl font-bold text-white mb-5 lg:mb-6">
            Built For Traders Who Follow
            <span className="text-sky-400"> Smart Money</span>
          </h2>

          <p className="max-w-3xl mx-auto text-gray-400 text-base lg:text-lg leading-7 lg:leading-8 px-2">
            Our platform helps traders understand institutional market
            positioning through simplified Commitment of Traders analysis and
            professional trading tools.
          </p>
        </div>

        {/* Features */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-[#171B22] border border-sky-500/20 rounded-2xl p-5 sm:p-6 lg:p-8 hover:border-sky-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300"
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-2xl lg:text-3xl mb-5 lg:mb-6 group-hover:bg-sky-500 group-hover:text-white transition">
                {feature.icon}
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-400 text-sm lg:text-base leading-7 lg:leading-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
