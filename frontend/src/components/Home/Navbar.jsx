import logo from "../../assets/logo.png";

export default function Navbar({ openLogin, openRegister }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto h-24 px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="BigFree FX"
            className="w-24 h-24 object-contain"
          />

          <div className="translate-y-3">
            <h1 className="text-2xl font-bold text-white tracking-wide">
              BIGFREE FX
            </h1>

            <p className="text-sky-400 text-sm uppercase tracking-[4px]">
              Commitment of Traders
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          {["Home", "HowItWorks", "Preview", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative text-gray-300 hover:text-sky-400 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:w-0 after:h-[2px] after:bg-sky-400 after:transition-all hover:after:w-full"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={openLogin}
            className="px-6 py-3 rounded-xl border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
          >
            Member Login
          </button>

          <button
            onClick={openRegister}
            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30 transition-all duration-300"
          >
            Become a Member
          </button>
        </div>
      </div>
    </header>
  );
}
