const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-800 py-6 text-center">
      <p className="text-blue-400 font-semibold tracking-widest">
        BIGFREE FX TRADING
      </p>

      <p className="text-gray-500 text-sm mt-1">
        COMMITMENT OF TRADERS ANALYSIS
      </p>

      <p className="text-gray-500 text-sm mt-2">
        Email: rodriguezserobe@mail.com
      </p>

      <p className="text-gray-500 text-sm">Contact: 071 138 5640</p>

      <p className="text-gray-600 text-xs mt-3">
        © {new Date().getFullYear()} BIGFREE FX TRADING. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
