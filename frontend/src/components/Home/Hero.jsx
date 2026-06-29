import heroImage from "../../assets/image1.jpg";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background */}

      <img
        src={heroImage}
        alt="BigFree FX"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#090b10]/95 via-[#090b10]/80 to-[#090b10]/55"></div>

      {/* Content */}

      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-8">
        <div className="max-w-3xl">
          <p className="translate-y-3 uppercase tracking-[6px] text-sky-400 font-semibold mb-5 animate-pulse">
            Commitment of Traders Analysis
          </p>

          <h1 className="text-4xl lg:text-5xl font-black leading-tight text-white mb-8 translate-y-3">
            <span className="block animate-[fadeInDown_1s_ease]">
              BIGFREE FX
            </span>

            <span className="block text-sky-400 animate-[fadeInUp_1.2s_ease]">
              TRADING
            </span>
          </h1>

          <p className="text-xl text-gray-300 leading-9 max-w-2xl mb-10">
            We transform complex Commitment of Traders (COT) reports into simple
            institutional market analysis, helping traders understand where
            Smart Money is positioned across Forex, Metals, Indices and
            Cryptocurrency markets.
          </p>

          <button className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 px-10 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-sky-500/30">
            Become a Member
          </button>
        </div>
      </div>
    </section>
  );
}
