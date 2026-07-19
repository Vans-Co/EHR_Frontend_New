import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps =
  React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          // Layout
          "flex h-14 w-full rounded-2xl",

          // Background
          "bg-white",

          // Border
          "border border-slate-200",

          // Padding
          "px-4",

          // Typography
          "text-[15px] text-slate-900",
          "placeholder:text-slate-400",

          // Shadow
          "shadow-sm",

          // Animation
          "transition-all duration-300",

          // Focus
          "focus:border-primary",
          "focus:ring-4",
          "focus:ring-primary/10",
          "focus:outline-none",

          // Disabled
          "disabled:cursor-not-allowed",
          "disabled:bg-slate-100",
          "disabled:text-slate-400",

          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
