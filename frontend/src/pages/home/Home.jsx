import Navbar from "../../components/Home/Navbar";
import Hero from "../../components/Home/Hero";
import FloatingCards from "../../components/Home/FloatingCards";
import WhyChoose from "../../components/Home/WhyChoose";
import DashboardPreview from "../../components/Home/DashboardPreview";
import HowItWorks from "../../components/Home/HowItWorks";
import Footer from "../../components/Home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar />

      <Hero />

      <FloatingCards />

      <DashboardPreview />

      <WhyChoose />

      <HowItWorks />

      <Footer />
    </div>
  );
}
