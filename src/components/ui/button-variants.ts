import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "rounded-2xl",
    "font-semibold",
    "transition-all",
    "duration-300",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "focus-visible:outline-none",
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 shadow-md",
        secondary: "bg-secondary text-white hover:bg-secondary/90",
        outline: "border border-outline-variant bg-white hover:bg-surface-container-low",
        ghost: "hover:bg-surface-container-low",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        success: "bg-emerald-500 text-white hover:bg-emerald-600",
        warning: "bg-amber-500 text-white hover:bg-amber-600",
      },

      size: {
        default: "h-12 px-6",
        sm: "h-10 px-4",
        lg: "h-14 px-8",
        icon: "h-12 w-12",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);