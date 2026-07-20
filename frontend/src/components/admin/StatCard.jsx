export default function StatCard({
  title,
  value,
  color = "sky",
  active = false,
  onClick,
}) {
  const colors = {
    sky: {
      border: "border-sky-500",
      text: "text-sky-400",
      active: "bg-sky-600 border-sky-400 text-white shadow-sky-500/40",
    },

    green: {
      border: "border-green-500",
      text: "text-green-400",
      active: "bg-green-600 border-green-400 text-white shadow-green-500/40",
    },

    yellow: {
      border: "border-yellow-500",
      text: "text-yellow-400",
      active: "bg-yellow-500 border-yellow-300 text-white shadow-yellow-500/40",
    },

    red: {
      border: "border-red-500",
      text: "text-red-400",
      active: "bg-red-600 border-red-400 text-white shadow-red-500/40",
    },
  };

  const style = colors[color];

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-xl lg:rounded-2xl
        p-4 sm:p-5 lg:p-6 2xl:p-8
        border
        text-left
        transition-all
        duration-300
        hover:scale-105
        cursor-pointer

        ${active ? `${style.active} shadow-xl` : `bg-[#171b22] ${style.border}`}
      `}
    >
      <p
        className={`
          uppercase tracking-wider
          text-xs sm:text-sm lg:text-sm 2xl:text-base
          ${active ? "text-white/80" : "text-slate-400"}
        `}
      >
        {title}
      </p>

      <h2
        className={`
          mt-3 lg:mt-4
          font-bold
          text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl
          ${active ? "text-white" : style.text}
        `}
      >
        {value}
      </h2>
    </button>
  );
}
