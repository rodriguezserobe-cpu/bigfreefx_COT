import heroImage from "../../assets/image1.jpg";

export default function Hero({ setAuthMode }) {
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
          <p className="uppercase tracking-[3px] md:tracking-[6px] text-sky-400 font-semibold mb-2 animate-pulse text-sm md:text-base">
            Trade with purpose. Grow with every trade.
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black leading-tight text-white mb-8">
            <span className="block">BIGFREE FX</span>
            <span className="block text-sky-400">TRADING</span>
          </h1>

          <p className="max-w-full md:max-w-[620px] lg:max-w-[620px] mx-auto lg:mx-0 text-base md:text-lg leading-8 md:leading-9 text-gray-300 mb-10">
            BigFree FX helps traders bring structure to their decisions, learn
            from their performance, and build the discipline needed for
            long-term growth. develop better habits, measure their progress, and
            turn their trading journey into a path of continuous improvement.
          </p>

          <button
            onClick={() => setAuthMode("register")}
            className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 transition-all duration-300 px-8 py-3 rounded-xl text-base font-semibold shadow-lg shadow-sky-500/30"
          >
            Become a Member
          </button>
        </div>
      </div>
    </section>
  );
}
