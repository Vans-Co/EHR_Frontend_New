import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface AppCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

const AppCard = ({
  children,
  title,
  subtitle,
  icon,
  action,
  footer,
  className,
  bodyClassName,
}: AppCardProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-3xl",
        "border border-outline-variant",
        "bg-surface-container-lowest",
        "shadow-sm transition-all duration-300",
        "hover:-translate-y-0.5",
        "hover:shadow-xl",
        className
      )}
    >
      {(title || subtitle || icon || action) && (
        <div className="flex items-start justify-between border-b border-outline-variant px-6 py-5">
          <div className="flex items-start gap-4">
            {icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                {icon}
              </div>
            )}

            <div>
              {title && (
                <h2 className="text-lg font-semibold text-on-background">
                  {title}
                </h2>
              )}

              {subtitle && (
                <p className="mt-1 text-sm text-on-surface-variant">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {action}
        </div>
      )}

      <div className={cn("p-6", bodyClassName)}>
        {children}
      </div>

      {footer && (
        <div className="border-t border-outline-variant bg-surface-container-low px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export default AppCard;