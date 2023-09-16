import { Typography } from "../Typography";

export const Field = ({ className, error, label, ...props }) => {
  return (
    <label className="relative block">
      <span className="text-sm text-bold">{label}</span>
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2  pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        {...props}
      />
      {error && (
        <Typography className="text-red-800 text-xs">{error}</Typography>
      )}
    </label>
  );
};
