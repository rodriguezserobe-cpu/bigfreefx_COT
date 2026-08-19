import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-sky-500/20 bg-[#0d1117]/90 backdrop-blur-lg">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white">BIGFREE FX</h2>

            <p className="text-sky-400 text-sm tracking-[3px] uppercase mt-1">
              Trading
            </p>

            <p className="text-gray-400 mt-4 leading-7">
              Helping traders combine Commitment of Traders analysis with their
              own trading strategy through professional trading tools.
            </p>
          </div>

          {/* Platform */}
          <div className="lg:translate-x-20">
            <h3 className="text-white font-semibold mb-4">Platform</h3>

            <div className="space-y-3 text-gray-400">
              <Link to="/bigfreefxhub" className="block hover:text-sky-400">
                Hub
              </Link>

              <Link to="/dashboard" className="block hover:text-sky-400">
                COT Dashboard
              </Link>

              <Link to="/journal" className="block hover:text-sky-400">
                Trading Journal
              </Link>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="lg:translate-x-15">
            <h3 className="text-white font-semibold mb-4">Coming Soon</h3>

            <div className="space-y-3 text-gray-400">
              <p>Education Center</p>
              <p>Market News</p>
              <p>Economic Calendar</p>
              <p>AI Trading Assistant</p>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>

            <div className="space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-sky-400" />
                <span>rodriguezserobe@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-sky-400" />
                <span>+27 71 138 5640</span>
              </div>

              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-sky-400" />
                <span>WhatsApp Support</span>
              </div>

              <div className="flex gap-4 pt-4">
                <a
                  href="#"
                  className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center hover:border-sky-400 hover:text-sky-400 transition"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center hover:border-sky-400 hover:text-sky-400 transition"
                >
                  <FaWhatsapp />
                </a>

                <a
                  href="mailto:rodriguezserobe@gmail.com"
                  className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center hover:border-sky-400 hover:text-sky-400 transition"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 text-center text-gray-500 text-sm">
          © {year} BigFree FX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
