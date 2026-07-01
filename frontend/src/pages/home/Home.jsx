import { useState } from "react";

import Navbar from "../../components/Home/Navbar";
import Hero from "../../components/Home/Hero";
import FloatingCards from "../../components/Home/FloatingCards";
import WhyChoose from "../../components/Home/WhyChoose";
import DashboardPreview from "../../components/Home/DashboardPreview";
import HowItWorks from "../../components/Home/HowItWorks";
import Footer from "../../components/Home/Footer";

export default function Home() {
  const [authMode, setAuthMode] = useState(null);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar
        openLogin={() => setAuthMode("login")}
        openRegister={() => setAuthMode("register")}
      />

      <Hero authMode={authMode} setAuthMode={setAuthMode} />

      <FloatingCards />

      <DashboardPreview />

      <WhyChoose />

      <HowItWorks />

      <Footer />
    </div>
  );
}
