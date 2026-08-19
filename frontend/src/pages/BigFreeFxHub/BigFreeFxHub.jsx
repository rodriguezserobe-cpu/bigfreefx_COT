import { Link } from "react-router-dom";
import Navbar from "../../components/BigFreeFxHub/Navbar";
import Footer from "../../components/BigFreeFxHub/Footer";
import hubBg from "../../assets/hub-bg1.jpg";

import {
  FaChartLine,
  FaBookOpen,
  FaGraduationCap,
  FaNewspaper,
  FaCalendarAlt,
  FaRobot,
} from "react-icons/fa";

const dashboards = [
  {
    title: "COT Dashboard",
    description:
      "Analyze institutional positioning using Commitment of Traders reports.",
    icon: <FaChartLine className="text-4xl text-blue-500" />,
    button: "Open Dashboard",
    link: "/dashboard",
    available: true,
  },
  {
    title: "Trading Journal",
    description:
      "Record, review and analyze every trade to improve your performance.",
    icon: <FaBookOpen className="text-4xl text-blue-500" />,
    button: "Open Journal",
    link: "/journal",
    available: true,
  },
  {
    title: "Education Center",
    description: "Trading lessons, videos and educational resources.",
    icon: <FaGraduationCap className="text-4xl text-gray-500" />,
    button: "Coming Later",
    available: false,
  },
  {
    title: "Market News",
    description: "Latest forex, crypto and financial market news.",
    icon: <FaNewspaper className="text-4xl text-gray-500" />,
    button: "Coming Later",
    available: false,
  },
  {
    title: "Economic Calendar",
    description: "Track important economic events affecting the markets.",
    icon: <FaCalendarAlt className="text-4xl text-gray-500" />,
    button: "Coming Later",
    available: false,
  },
  {
    title: "AI Trading Assistant",
    description: "Your future intelligent trading companion inside BigFree FX.",
    icon: <FaRobot className="text-4xl text-gray-500" />,
    button: "Coming Later",
    available: false,
  },
];

const BigFreeFxHub = () => {
  return (
    <>
      <Navbar />

      <div
        className="min-h-screen text-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(6,10,20,0.88), rgba(6,10,20,0.92)), url(${hubBg})`,
        }}
      >
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-48 pb-10">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
            {dashboards.map((dashboard) => (
              <div
                key={dashboard.title}
                className={`rounded-2xl border p-6 transition-all duration-300 ${
                  dashboard.available
                    ? "border-slate-700 bg-slate-900/80 hover:border-blue-500 hover:-translate-y-1"
                    : "border-slate-800 bg-slate-900 opacity-70"
                }`}
              >
                <div className="flex justify-between items-start">
                  {dashboard.icon}

                  {!dashboard.available && (
                    <span className="text-xs bg-slate-700 px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold mt-5">{dashboard.title}</h2>

                <p className="text-gray-400 mt-3 leading-7">
                  {dashboard.description}
                </p>

                {dashboard.available ? (
                  <Link
                    to={dashboard.link}
                    className="block mt-8 bg-blue-600 hover:bg-blue-700 text-center py-3 rounded-xl font-semibold"
                  >
                    {dashboard.button}
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full mt-8 bg-slate-700 py-3 rounded-xl"
                  >
                    {dashboard.button}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BigFreeFxHub;
