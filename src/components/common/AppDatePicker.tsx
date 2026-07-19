import { forwardRef } from "react";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";

interface AppDatePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const AppDatePicker = forwardRef<
  HTMLInputElement,
  AppDatePickerProps
>(
  (
    {
      label,
      error,
      helperText,
      required,
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
            "flex h-14 items-center rounded-2xl border bg-white px-4 transition-all duration-300",

            error
              ? "border-red-400"
              : "border-outline-variant",

            "focus-within:border-primary",
            "focus-within:ring-4",
            "focus-within:ring-primary/10"
          )}
        >

          <CalendarDays
            size={20}
            className="mr-3 text-on-surface-variant"
          />

          <input
            ref={ref}
            type="date"
            className={cn(
              "w-full border-none bg-transparent outline-none",

              "text-on-background",

              className
            )}
            {...props}
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

AppDatePicker.displayName = "AppDatePicker";

export default AppDatePicker;