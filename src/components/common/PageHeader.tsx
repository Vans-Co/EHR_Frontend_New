import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const PageHeader = ({
  title,
  subtitle,
  actions,
}: PageHeaderProps) => {
  return (
    <div
      className="
        mb-8
        flex
        flex-col
        gap-5
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      {/* Left Section */}

      <div className="min-w-0 flex-1">

        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
            text-on-background
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="
              mt-2
              max-w-3xl
              text-sm
              leading-6
              text-on-surface-variant
            "
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Section */}

      {actions && (
        <div
          className="
            flex
            shrink-0
            items-center
            gap-3
          "
        >
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;