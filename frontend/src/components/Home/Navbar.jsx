import logo from "../../assets/logo.png";

const Navbar = ({ openLogin, openRegister }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/80 backdrop-blur-xl border-b border-sky-500/20 shadow-lg">
      <div className="max-w-[1800px] mx-auto px-8 h-20 flex items-center justify-between">
        {/* Logo */}

        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={logo}
            alt="Logo"
            className="w-26 h-26 object-contain translate-y-0 transition-transform duration-300 hover:scale-105"
          />

          <div>
            <h1 className="text-2xl font-bold text-white">BIGFREE FX</h1>

            <p className="text-xs uppercase tracking-[0.35em] text-sky-400">
              Trading
            </p>
          </div>
        </div>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-10">
          <a
            href="#home"
            className="text-gray-300 hover:text-sky-400 transition"
          >
            Home
          </a>

          <a
            href="#features"
            className="text-gray-300 hover:text-sky-400 transition"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-gray-300 hover:text-sky-400 transition"
          >
            Pricing
          </a>

          <a
            href="#contact"
            className="text-gray-300 hover:text-sky-400 transition"
          >
            Contact
          </a>
        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-4">
          <button
            onClick={openLogin}
            className="px-5 py-2 rounded-lg border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition duration-300"
          >
            Member Login
          </button>

          <button
            onClick={openRegister}
            className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition duration-300"
          >
            Become a Member
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
