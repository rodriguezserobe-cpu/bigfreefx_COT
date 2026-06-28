import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";

const slides = [
  {
    image: image1,
    title: "BIGFREE FX TRADING",
    subtitle: "Institutional Commitment of Traders Reports",
    description: "Trade with Smart Money, not against it.",
  },
  {
    image: image2,
    title: "FOREX MARKET ANALYSIS",
    subtitle: "Institutional Positioning",
    description: "Know where hedge funds are buying and selling.",
  },
  {
    image: image3,
    title: "GOLD & SILVER",
    subtitle: "Commercial vs Managed Money",
    description: "Follow institutional sentiment before entering a trade.",
  },
  {
    image: image4,
    title: "CRYPTO COT REPORTS",
    subtitle: "Bitcoin • Ethereum • XRP • SOL",
    description: "Professional institutional analysis.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative h-[88vh] overflow-hidden mt-20">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            current === index ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80"></div>

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-12">
              <h1 className="text-6xl font-bold mb-6">{slide.title}</h1>

              <h2 className="text-3xl text-sky-400 mb-5">{slide.subtitle}</h2>

              <p className="text-xl text-gray-300 max-w-2xl mb-10">
                {slide.description}
              </p>

              <div className="flex gap-5">
                <button className="bg-sky-500 hover:bg-sky-600 px-8 py-4 rounded-xl font-semibold">
                  Become a Member
                </button>

                <button className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-xl font-semibold transition">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Left */}

      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-sky-500 w-14 h-14 rounded-full flex items-center justify-center"
      >
        <ChevronLeft />
      </button>

      {/* Right */}

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-sky-500 w-14 h-14 rounded-full flex items-center justify-center"
      >
        <ChevronRight />
      </button>

      {/* Dots */}

      <div className="absolute bottom-10 w-full flex justify-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-4 h-4 rounded-full transition ${
              current === index ? "bg-sky-500 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
