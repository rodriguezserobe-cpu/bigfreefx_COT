import logo from "../../assets/logo.png";
import {
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#070B13] border-t border-sky-500/20">
      {/* Top */}
      <div className="max-w-7xl 2xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          {/* Logo */}
          <div>
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="flex items-center justify-center md:justify-start gap-3 mb-6"
            >
              <img src={logo} alt="BigFree FX" className="w-14 h-14" />

              <div>
                <h2 className="text-2xl font-bold text-white">BIGFREE FX</h2>
                <p className="text-sky-400 text-sm">Institutional Trading</p>
              </div>
            </button>

            <p className="text-gray-400 leading-8">
              BigFree FX Trading simplifies Commitment of Traders (COT)
              analysis, helping traders understand institutional market
              positioning for Forex, Metals and Cryptocurrency markets.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:translate-x-20">
            <h3 className="text-white font-bold text-xl mb-6">Quick Links</h3>

            <ul className="space-y-4 text-gray-400">
              <li
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="hover:text-sky-400 cursor-pointer"
              >
                Home
              </li>

              <li
                onClick={() =>
                  document
                    .getElementById("preview")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-sky-400 cursor-pointer"
              >
                Explore Platform
              </li>

              <li
                onClick={() =>
                  document
                    .getElementById("hero")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-sky-400 cursor-pointer"
              >
                Membership
              </li>

              <li
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-sky-400 cursor-pointer"
              >
                Contact
              </li>
            </ul>
          </div>

          {/* Markets */}
          <div className="lg:translate-x-20">
            <h3 className="text-white font-bold text-xl mb-6">Markets</h3>

            <ul className="space-y-4 text-gray-400">
              <li>Forex</li>
              <li>Gold</li>
              <li>Silver</li>
              <li>Cryptocurrency</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:translate-x-14">
            <h3 className="text-white font-bold text-xl mb-6">Contact</h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-center justify-center md:justify-start gap-4">
                <FaEnvelope className="text-sky-400" />
                <span>rodriguezserobe@gmail.com</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4">
                <FaPhoneAlt className="text-sky-400" />
                <a href="tel:+27711385640">+27 71 138 5640</a>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4">
                <FaWhatsapp className="text-sky-400" />
                <span>WhatsApp Support</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex justify-center md:justify-start gap-4 mt-8">
              <a
                href="https://facebook.com/YOUR_PAGE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full border border-sky-500/20 bg-[#0d1117] flex items-center justify-center text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
              >
                <FaFacebookF size={20} />
              </a>

              <a
                href="https://wa.me/27711385640"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full border border-sky-500/20 bg-[#0d1117] flex items-center justify-center text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
              >
                <FaWhatsapp size={20} />
              </a>

              <a
                href="mailto:rodriguezserobe@gmail.com"
                className="w-14 h-14 rounded-full border border-sky-500/20 bg-[#0d1117] flex items-center justify-center text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-sky-500/10">
        <div className="max-w-7xl 2xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
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
