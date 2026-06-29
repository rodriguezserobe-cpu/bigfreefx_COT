import {
  FaPhoneAlt,
  FaMoneyBillWave,
  FaUserPlus,
  FaCheckCircle,
  FaUnlockAlt,
  FaChartLine,
} from "react-icons/fa";

import background from "../../assets/image5.jpg"; // Change to your preferred background

const steps = [
  {
    icon: <FaPhoneAlt />,
    title: "Contact Us",
    text: "Start your membership application.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Payment",
    text: "Receive secure payment instructions.",
  },
  {
    icon: <FaUserPlus />,
    title: "Register",
    text: "Create your BigFree FX account.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Verification",
    text: "Your payment is verified by our team.",
  },
  {
    icon: <FaUnlockAlt />,
    title: "Approval",
    text: "Your membership is activated.",
  },
  {
    icon: <FaChartLine />,
    title: "Dashboard",
    text: "Access professional COT analysis.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="relative py-6 bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#07111f]/85"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-[5px] text-sky-400 font-semibold mb-3">
            Membership Process
          </p>

          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>

          <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-8">
            Becoming a BigFree FX member is simple. Follow these steps to gain
            access to institutional Commitment of Traders analysis.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Line */}
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[62%] w-full h-[2px] bg-sky-500/30"></div>
              )}

              {/* Icon */}
              <div className="relative mx-auto w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500 flex items-center justify-center text-sky-400 text-2xl mb-6 transition hover:bg-sky-500 hover:text-white">
                {step.icon}
              </div>

              <h3 className="text-white font-bold text-lg mb-3">
                {step.title}
              </h3>

              <p className="text-gray-400 text-sm leading-6">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
