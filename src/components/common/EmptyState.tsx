import type { ReactNode } from "react";

import { SearchX } from "lucide-react";

import AppButton from "./AppButton";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-sm">

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon ?? <SearchX size={36} />}
      </div>

      <h2 className="text-xl font-semibold text-on-background">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-sm text-sm leading-6 text-on-surface-variant">
          {description}
        </p>
      )}

      {actionLabel && (
        <AppButton
          className="mt-6"
          onClick={onAction}
        >
          {actionLabel}
        </AppButton>
      )}

    </div>
  );
};

export default EmptyState;