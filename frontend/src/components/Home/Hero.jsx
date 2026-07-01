import heroImage from "../../assets/image1.jpg";
import AuthPanel from "./auth/AuthPanel";

export default function Hero({ authMode, setAuthMode }) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img
        src={heroImage}
        alt="BigFree FX"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#090b10]/95 via-[#090b10]/80 to-[#090b10]/55" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto min-h-screen flex items-center px-8">
        {/* LEFT SIDE */}
        <div className="w-[58%]">
          <p className="uppercase tracking-[6px] text-sky-400 font-semibold mb-5 animate-pulse">
            Commitment of Traders Analysis
          </p>

          <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white mb-8">
            <span className="block">BIGFREE FX</span>

            <span className="block text-sky-400">TRADING</span>
          </h1>

          <p className="max-w-[620px] text-lg leading-9 text-gray-300 mb-10">
            We transform complex Commitment of Traders (COT) reports into simple
            institutional market analysis, helping traders understand where
            Smart Money is positioned across Forex, Metals, Indices and
            Cryptocurrency markets.
          </p>

          <button
            onClick={() => setAuthMode("register")}
            className="bg-sky-500 hover:bg-sky-600 transition-all duration-300 px-10 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-sky-500/30"
          >
            Become a Member
          </button>
        </div>

        {/* RIGHT PANEL (ABSOLUTE - DOESN'T MOVE LEFT SIDE) */}
        {authMode && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[560px]">
            <AuthPanel authMode={authMode} setAuthMode={setAuthMode} />
          </div>
        )}
      </div>
    </section>
  );
}
