import heroImage from "../../assets/image1.jpg";
import AuthPanel from "./auth/AuthPanel";

export default function Hero({ authMode, setAuthMode, formRef }) {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <img
        src={heroImage}
        alt="BigFree FX"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#090b10]/95 via-[#090b10]/80 to-[#090b10]/55" />

      {/* Content */}

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1700px] mx-auto min-h-screen flex flex-col lg:flex-row items-center px-6 md:px-8 lg:px-8 pt-28 lg:pt-0">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[58%] text-center lg:text-left">
          <p className="uppercase tracking-[3px] md:tracking-[6px] text-sky-400 font-semibold mb-5 animate-pulse text-sm md:text-base">
            Commitment of Traders Analysis
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black leading-tight text-white mb-8">
            <span className="block">BIGFREE FX</span>

            <span className="block text-sky-400">TRADING</span>
          </h1>

          <p className="max-w-full md:max-w-[620px] lg:max-w-[620px] mx-auto lg:mx-0 text-base md:text-lg leading-8 md:leading-9 text-gray-300 mb-10">
            We transform complex Commitment of Traders (COT) reports into simple
            institutional market analysis, helping traders understand where
            Smart Money is positioned across Forex, Metals, Indices and
            Cryptocurrency markets.
          </p>

          <button
            onClick={() => setAuthMode("register")}
            className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 transition-all duration-300 px-10 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-sky-500/30"
          >
            Become a Member
          </button>
        </div>

        {/* RIGHT PANEL */}
        {authMode && (
          <div
            ref={formRef}
            className="w-full lg:w-[560px] mt-10 lg:mt-0 lg:absolute lg:right-8 lg:top-1/2 lg:-translate-y-1/2"
          >
            <AuthPanel authMode={authMode} setAuthMode={setAuthMode} />
          </div>
        )}
      </div>
    </section>
  );
}
