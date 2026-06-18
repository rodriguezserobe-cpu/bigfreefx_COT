import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1e1e1e]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center px-8 py-4">
        <img
          src={logo}
          alt="Logo"
          className="w-24 h-24 object-contain translate-y-0"
        />

        <div className="ml-4 translate-y-3">
          <h1 className="text-2xl tracking-wider font-light">
            BIGFREE FX TRADING
          </h1>

          <p className="text-gray-400 tracking-[6px]">COMMITMENT OF TRADERS</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
