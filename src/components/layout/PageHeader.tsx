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
              {/* ========================= */}
      {/* Left Section */}
      {/* ========================= */}

      <div className="min-w-0">

        {/* Title */}

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

        {/* Subtitle */}

        {subtitle && (

          <p
            className="
              mt-2
              max-w-2xl
              text-sm
              text-on-surface-variant
            "
          >
            {subtitle}
          </p>

        )}

      </div>

      {/* ========================= */}
      {/* Right Section */}
      {/* ========================= */}

      {actions && (

        <div
          className="
            flex
            shrink-0
            items-center
            justify-start
            md:justify-end
          "
        >
          {actions}
        </div>

      )}
            {/* ===================================== */}
      {/* Future Enhancement Placeholder */}
      {/* ===================================== */}

      {/*
        Future:
        <Breadcrumbs />
        Dashboard / Appointments / Details

        This space is intentionally kept
        for future navigation support.
      */}
          </div>

  );
};

export default PageHeader;

/*
==========================================================
Future Enhancements
==========================================================

✓ Breadcrumb Navigation

Dashboard / Appointments / Details

✓ Page Statistics

24 Appointments Today

✓ Filters

Date Range
Search
Status

✓ Multiple Action Buttons

✓ Mobile Action Sheet

✓ API Ready
*/
