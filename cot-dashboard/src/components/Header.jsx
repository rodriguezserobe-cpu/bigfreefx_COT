import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div className="flex items-center gap-6 mb-10">
      <img src={logo} alt="Logo" className="w-34 h-34 object-contain -mt-11" />

      <div className="flex flex-col justify-center">
        <h1 className="text-4xl tracking-wider font-light">
          BIGFREE FX TRADING
        </h1>

        <p className="text-gray-400 tracking-[6px]">COMMITMENT OF TRADERS</p>
      </div>
    </div>
  );
};

export default Header;
