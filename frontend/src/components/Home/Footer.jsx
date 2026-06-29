import logo from "../../assets/logo.png";
import {
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#070B13] border-t border-sky-500/20">
      {/* Top */}

      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Logo */}

          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="BigFree FX" className="w-14 h-14" />

              <div>
                <h2 className="text-2xl font-bold text-white">BIGFREE FX</h2>

                <p className="text-sky-400 text-sm">Institutional Trading</p>
              </div>
            </div>

            <p className="text-gray-400 leading-8">
              BigFree FX Trading simplifies Commitment of Traders (COT)
              analysis, helping traders understand institutional market
              positioning for Forex, Metals and Cryptocurrency markets.
            </p>
          </div>

          {/* Quick Links */}

          <div className="translate-x-20">
            <h3 className="text-white font-bold text-xl mb-6">Quick Links</h3>

            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-sky-400 cursor-pointer">Home</li>

              <li className="hover:text-sky-400 cursor-pointer">
                Explore Platform
              </li>

              <li className="hover:text-sky-400 cursor-pointer">Membership</li>

              <li className="hover:text-sky-400 cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Markets */}

          <div className="translate-x-20">
            <h3 className="text-white font-bold text-xl mb-6">Markets</h3>

            <ul className="space-y-4 text-gray-400">
              <li>Forex</li>

              <li>Gold</li>

              <li>Silver</li>

              <li>Cryptocurrency</li>
            </ul>
          </div>

          {/* Contact */}

          <div className="translate-x-14">
            <h3 className="text-white font-bold text-xl mb-6">Contact</h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-sky-400" />
                <span>rodriguezserobe@gmail.com</span>
              </div>

              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-sky-400" />
                <span>+27 71 138 5640</span>
              </div>

              <div className="flex items-center gap-4">
                <FaWhatsapp className="text-sky-400" />
                <span>WhatsApp Support</span>
              </div>
            </div>

            {/* Social */}

            <div className="flex gap-4 mt-8 translate-x-0">
              <button className="w-11 h-11 rounded-full bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500 hover:text-white transition flex items-center justify-center">
                <FaFacebookF />
              </button>

              <button className="w-11 h-11 rounded-full bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500 hover:text-white transition flex items-center justify-center">
                <FaWhatsapp />
              </button>

              <button className="w-11 h-11 rounded-full bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500 hover:text-white transition flex items-center justify-center">
                <FaEnvelope />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}

      <div className="border-t border-sky-500/10">
        <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 BigFree FX Trading. All Rights Reserved.
          </p>

          <div className="flex gap-8 mt-4 md:mt-0 text-gray-500 text-sm">
            <span className="hover:text-sky-400 cursor-pointer">
              Privacy Policy
            </span>

            <span className="hover:text-sky-400 cursor-pointer">
              Terms & Conditions
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
