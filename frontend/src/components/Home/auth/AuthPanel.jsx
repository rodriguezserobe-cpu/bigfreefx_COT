import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function WelcomePanel({ isLogin, setAuthMode }) {
  return (
    <div
      className={`
    relative w-1/2 overflow-hidden
    bg-gradient-to-br from-[#061827] via-[#073b5d] to-[#08a9ed]
    flex items-center justify-center
    p-10

    max-sm:w-full
    max-sm:min-h-[300px]
    max-sm:p-6

    ${
      isLogin
        ? "rounded-r-[45%] max-sm:rounded-r-none max-sm:rounded-tl-none max-sm:rounded-tr-none max-sm:rounded-bl-[20%] max-sm:rounded-br-[20%]"
        : "rounded-l-[45%] max-sm:rounded-l-none max-sm:rounded-tl-[20%] max-sm:rounded-tr-[20%] max-sm:rounded-bl-none max-sm:rounded-br-none"
    }
  `}
    >
      {/* Glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-sky-300/20 blur-3xl" />

      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-sky-500/30 blur-3xl" />

      <div className="relative z-10 text-center max-w-md">
        {/* BRAND */}
        <div className="mb-12 max-sm:mb-6">
          <h1 className="text-4xl lg:text-5xl max-sm:text-3xl font-black tracking-[4px] text-white">
            BIGFREE FX
          </h1>

          <p className="mt-2 text-sm max-sm:text-xs tracking-[7px] max-sm:tracking-[5px] text-sky-200 uppercase">
            Trading
          </p>
        </div>

        {/* TITLE */}
        <h2 className="text-3xl lg:text-4xl max-sm:text-2xl font-bold text-white">
          {isLogin ? "Welcome Back!" : "Hello, Welcome!"}
        </h2>

        {/* MESSAGE */}
        <p className="mt-5 max-sm:mt-3 text-slate-200 text-base lg:text-lg max-sm:text-sm leading-7 max-sm:leading-6">
          {isLogin
            ? "Continue your trading journey with BigFree FX and keep building better habits, stronger discipline, and consistent progress."
            : "Build your trading journey with a platform designed to help you learn, stay disciplined, understand your performance, and grow."}
        </p>

        {/* SWITCH */}
        <div className="mt-10 max-sm:mt-6">
          <p className="text-slate-200 mb-4 max-sm:mb-3 text-sm sm:text-base">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>

          <button
            type="button"
            onClick={() => setAuthMode(isLogin ? "register" : "login")}
            className="
          px-10 max-sm:px-8
          py-3 max-sm:py-2.5
          rounded-xl
          border-2 border-white
          text-white
          font-semibold
          hover:bg-white
          hover:text-[#073b5d]
          transition-all duration-300
        "
          >
            {isLogin ? "Register" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AuthPanel({ authMode, setAuthMode }) {
  if (!authMode) return null;

  const isLogin = authMode === "login";

  return (
    <div
      className="
        fixed inset-0
        z-[999]
        bg-black/80
        backdrop-blur-md
        flex items-center justify-center
        p-4
        max-sm:p-2
        overflow-y-auto
      "
    >
      {/* AUTH CARD */}
      <div
        className="
          relative
          w-full
          max-w-5xl
          h-[650px]
          max-h-[90vh]
          overflow-hidden
          rounded-[28px]
          bg-[#0b111d]
          border border-sky-500/20
          shadow-2xl
          shadow-black/60

          max-sm:h-auto
          max-sm:max-h-[96vh]
          max-sm:overflow-y-auto
          max-sm:rounded-2xl
        "
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={() => setAuthMode(null)}
          className="
            absolute
            top-5
            right-5
            z-[100]
            w-10
            h-10
            rounded-full
            bg-black/30
            border border-white/10
            flex items-center justify-center
            text-slate-400
            hover:text-white
            hover:bg-sky-500/20
            transition

max-sm:top-3
            max-sm:right-3
            max-sm:w-9
            max-sm:h-9
          "
        >
          <X size={22} />
        </button>

        {/* ================================================= */}
        {/* LOGIN */}
        {/* BLUE LEFT — FORM RIGHT */}
        {/* ================================================= */}

        {isLogin && (
          <div className="flex h-full max-sm:flex-col">
            {/* LEFT BLUE */}
            <WelcomePanel isLogin={true} setAuthMode={setAuthMode} />

            {/* RIGHT FORM */}
            <div
              className="
                w-1/2
                bg-[#0b111d]
                overflow-y-auto
                flex items-center justify-center
                p-10

                max-sm:w-full
                max-sm:p-6
                max-sm:py-10
              "
            >
              <div className="w-full max-w-md">
                <LoginForm setAuthMode={setAuthMode} />
              </div>
            </div>
          </div>
        )}

        {/* ================================================= */}
        {/* REGISTER */}
        {/* FORM LEFT — BLUE RIGHT */}
        {/* ================================================= */}

        {!isLogin && (
          <div className="flex h-full max-sm:flex-col">
            {/* LEFT FORM */}
            <div
              className="
                w-1/2
                bg-[#0b111d]
                overflow-y-auto
                flex items-center justify-center
                p-10

                max-sm:w-full
                max-sm:p-6
                max-sm:py-10
              "
            >
              <div className="w-full max-w-md">
                <RegisterForm setAuthMode={setAuthMode} />
              </div>
            </div>

            {/* RIGHT BLUE */}
            <WelcomePanel isLogin={false} setAuthMode={setAuthMode} />
          </div>
        )}
      </div>
    </div>
  );
}
