import { useState } from "react";

import Navbar from "../../components/Home/Navbar";
import HeroSlider from "../../components/Home/HeroSlider";
import Features from "../../components/Home/Features";
import LoginModal from "../../components/Home/LoginModal";
import RegisterModal from "../../components/Home/RegisterModal";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar
        openLogin={() => setLoginOpen(true)}
        openRegister={() => setRegisterOpen(true)}
      />

      <HeroSlider />

      <Features />

      {loginOpen && (
        <LoginModal
          close={() => setLoginOpen(false)}
          openRegister={() => {
            setLoginOpen(false);
            setRegisterOpen(true);
          }}
        />
      )}

      {registerOpen && <RegisterModal close={() => setRegisterOpen(false)} />}
    </div>
  );
}
