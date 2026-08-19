import { useState, useRef } from "react";

import Navbar from "../../components/Home/Navbar";
import Hero from "../../components/Home/Hero";
import AuthPanel from "../../components/Home/auth/AuthPanel";
import FloatingCards from "../../components/Home/FloatingCards";
import WhyChoose from "../../components/Home/WhyChoose";
import DashboardPreview from "../../components/Home/DashboardPreview";
import HowItWorks from "../../components/Home/HowItWorks";
import Footer from "../../components/Home/Footer";

export default function Home() {
  const [authMode, setAuthMode] = useState(null);

  const topRef = useRef(null);
  const previewRef = useRef(null);
  const howRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div ref={topRef} className="min-h-screen bg-[#111111] text-white">
      <Navbar
        topRef={topRef}
        previewRef={previewRef}
        howRef={howRef}
        contactRef={contactRef}
        openLogin={() => setAuthMode("login")}
        openRegister={() => setAuthMode("register")}
      />

      {/* Hero */}
      <Hero setAuthMode={setAuthMode} />

      {/* Authentication Overlay */}
      <AuthPanel authMode={authMode} setAuthMode={setAuthMode} />

      <FloatingCards />

      <div ref={previewRef}>
        <DashboardPreview />
      </div>

      <WhyChoose />

      <div ref={howRef}>
        <HowItWorks />
      </div>

      <div ref={contactRef}>
        <Footer />
      </div>
    </div>
  );
}
