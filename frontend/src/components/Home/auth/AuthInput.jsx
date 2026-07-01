export default function AuthInput({
  icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400">
        {icon}
      </span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-11
          rounded-xl
          border
          border-slate-600
          bg-transparent
          pl-12
          pr-4
          text-white
          placeholder:text-slate-400
          focus:outline-none
          focus:border-sky-500
          transition
        "
      />
    </div>
  );
}
