import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AppInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputWrapperClassName?: string;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      required,
      className,
      containerClassName,
      labelClassName,
      inputWrapperClassName,
      type = "text",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      useState(false);

    const inputType =
      type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className={cn("space-y-2", containerClassName)}>

        {label && (
          <label
            className={cn(
              "block text-sm font-semibold text-on-background",
              labelClassName
            )}
          >

            {label}

            {required && (
              <span className="ml-1 text-red-500">*</span>
            )}

          </label>
        )}

        <div
          className={cn(
            "group flex h-14 items-center rounded-2xl border bg-white px-4 transition-all duration-300",

            error
              ? "border-red-400"
              : "border-outline-variant",

            "focus-within:border-primary",

            "focus-within:ring-4",

            "focus-within:ring-primary/10"
            ,
            inputWrapperClassName
          )}
        >

          {leftIcon && (
            <span className="mr-3 text-on-surface-variant">
              {leftIcon}
            </span>
          )}

          <Input
            ref={ref}
            type={inputType}
            className={cn(
              "border-0 bg-transparent p-0 shadow-none",

              "focus-visible:ring-0",

              "placeholder:text-on-surface-variant",

              className
            )}
            {...props}
          />

          {type === "password" ? (
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="ml-2 text-on-surface-variant transition hover:text-primary"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          ) : (
            rightIcon && (
              <span className="ml-2 text-on-surface-variant">
                {rightIcon}
              </span>
            )
          )}
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

AppInput.displayName = "AppInput";

export default AppInput;
