import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface AppSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
}

const AppSelect = forwardRef<
  HTMLSelectElement,
  AppSelectProps
>(
  (
    {
      label,
      options,
      error,
      helperText,
      required,
      leftIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">

        {label && (
          <label className="block text-sm font-semibold text-on-background">
            {label}
            {required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>
        )}

        <div
          className={cn(
            "relative flex h-14 items-center rounded-2xl border bg-white px-4 transition-all duration-300",

            error
              ? "border-red-400"
              : "border-outline-variant",

            "focus-within:border-primary",
            "focus-within:ring-4",
            "focus-within:ring-primary/10"
          )}
        >

          {leftIcon && (
            <span className="mr-3 text-on-surface-variant">
              {leftIcon}
            </span>
          )}

          <select
            ref={ref}
            className={cn(
              "h-full w-full appearance-none bg-transparent outline-none",

              "text-on-background",

              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 text-on-surface-variant"
          />

        </div>

        {error ? (
          <p className="text-sm text-red-500">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-sm text-on-surface-variant">
            {helperText}
          </p>
        ) : null}

      </div>
    );
  }
);

AppSelect.displayName = "AppSelect";

export default AppSelect;