import { motion } from "framer-motion";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const VARIANTS = {
  primary:
    "bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 text-white shadow-lg shadow-cyan-200 hover:shadow-cyan-300",

  secondary:
    "bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 shadow-sm",

  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100",

  danger:
    "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100",
};

const SIZES = {
  sm: "h-9 px-3 text-sm rounded-xl gap-2",
  md: "h-11 px-5 text-sm rounded-2xl gap-2",
  lg: "h-12 px-6 text-base rounded-2xl gap-3",
};

export default function ActionButton({
  icon: Icon,
  label,
  onClick,
  variant = "secondary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
}: ActionButtonProps) {
  return (
    <motion.button
      whileHover={{
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -2,
      }}
      whileTap={{
        scale: disabled ? 1 : 0.98,
      }}
      transition={{
        duration: 0.18,
      }}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center font-medium transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-cyan-300",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Icon className="w-4 h-4" />
      )}

      <span>{loading ? "Loading..." : label}</span>
    </motion.button>
  );
}