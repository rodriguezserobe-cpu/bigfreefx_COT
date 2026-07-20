const Footer = () => {
  return (
    <footer className="mt-12 bg-[#0d1117]/90 backdrop-blur-xl border-t border-sky-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-6 sm:py-8">
        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="text-sky-400 text-lg sm:text-xl lg:text-2xl 2xl:text-3xl font-bold tracking-[3px]">
            BIGFREE FX TRADING
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm lg:text-base uppercase tracking-[3px]">
            Commitment of Traders Analysis
          </p>

          <div className="mt-4 space-y-2">
            <p className="text-gray-400 text-sm sm:text-base">
              📧 rodriguezserobe@mail.com
            </p>

            <p className="text-gray-400 text-sm sm:text-base">
              📞 +27 71 138 5640
            </p>
          </div>

          <div className="w-full h-px bg-sky-500/20 my-5"></div>

          <p className="text-gray-500 text-xs sm:text-sm">
            © {new Date().getFullYear()} BIGFREE FX TRADING. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
