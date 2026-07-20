import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";

export default function Navbar({
  topRef,
  previewRef,
  howRef,
  contactRef,
  formRef,
  openLogin,
  openRegister,
}) {
  const [mobileMenu, setMobileMenu] = useState(false);

  const scrollTo = (ref) => {
    ref?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const closeMenu = () => setMobileMenu(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1117]/90 backdrop-blur-xl border-b border-sky-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto h-20 md:h-24 px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => {
            scrollTo(topRef);
            closeMenu();
          }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={logo}
            alt="BigFree FX"
            className="w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
          />

          <div className="translate-y-1 md:translate-y-3">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-wide">
              BIGFREE FX
            </h1>

            <p className="text-[10px] md:text-sm text-sky-400 uppercase tracking-[2px] md:tracking-[4px]">
              Commitment of Traders
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <button
            onClick={() => scrollTo(topRef)}
            className="text-gray-300 hover:text-sky-400 transition"
          >
            Home
          </button>

          <button
            onClick={() => scrollTo(howRef)}
            className="text-gray-300 hover:text-sky-400 transition"
          >
            How It Works
          </button>

          <button
            onClick={() => scrollTo(previewRef)}
            className="text-gray-300 hover:text-sky-400 transition"
          >
            Preview
          </button>

          <button
            onClick={() => scrollTo(contactRef)}
            className="text-gray-300 hover:text-sky-400 transition"
          >
            Contact
          </button>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => {
              openLogin();

              setTimeout(() => {
                scrollTo(formRef);
              }, 100);
            }}
            className="px-6 py-3 rounded-xl border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300"
          >
            Member Login
          </button>

          <button
            onClick={() => {
              openRegister();

              setTimeout(() => {
                scrollTo(formRef);
              }, 100);
            }}
            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/30 transition-all duration-300"
          >
            Become a Member
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="lg:hidden text-white"
        >
          {mobileMenu ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-[#0d1117] border-t border-sky-500/20 px-6 py-6 space-y-5">
          <button
            onClick={() => {
              scrollTo(topRef);
              closeMenu();
            }}
            className="block w-full text-left text-white hover:text-sky-400"
          >
            Home
          </button>

          <button
            onClick={() => {
              scrollTo(howRef);
              closeMenu();
            }}
            className="block w-full text-left text-white hover:text-sky-400"
          >
            How It Works
          </button>

          <button
            onClick={() => {
              scrollTo(previewRef);
              closeMenu();
            }}
            className="block w-full text-left text-white hover:text-sky-400"
          >
            Preview
          </button>

          <button
            onClick={() => {
              scrollTo(contactRef);
              closeMenu();
            }}
            className="block w-full text-left text-white hover:text-sky-400"
          >
            Contact
          </button>

          <div className="pt-4 border-t border-slate-700 space-y-3">
            <button
              onClick={() => {
                openLogin();

                setTimeout(() => {
                  scrollTo(formRef);
                }, 100);

                closeMenu();
              }}
              className="w-full py-3 rounded-xl border border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-white transition"
            >
              Member Login
            </button>

            <button
              onClick={() => {
                openRegister();

                setTimeout(() => {
                  scrollTo(formRef);
                }, 100);

                closeMenu();
              }}
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition"
            >
              Become a Member
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
