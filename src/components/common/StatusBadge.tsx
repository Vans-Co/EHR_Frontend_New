import { CheckCircle2, Clock3, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type BadgeStatus =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "pending";

interface StatusBadgeProps {
  status: BadgeStatus;
  label?: string;
  className?: string;
}

const styles = {
  success:
    "bg-emerald-50 text-emerald-700 border border-emerald-200",

  warning:
    "bg-amber-50 text-amber-700 border border-amber-200",

  danger:
    "bg-red-50 text-red-700 border border-red-200",

  info:
    "bg-blue-50 text-blue-700 border border-blue-200",

  pending:
    "bg-slate-100 text-slate-700 border border-slate-200",
};

const icons = {
  success: <CheckCircle2 size={15} />,
  warning: <AlertTriangle size={15} />,
  danger: <XCircle size={15} />,
  info: <CheckCircle2 size={15} />,
  pending: <Clock3 size={15} />,
};

const defaultLabels = {
  success: "Completed",
  warning: "Warning",
  danger: "Cancelled",
  info: "Active",
  pending: "Pending",
};

const StatusBadge = ({
  status,
  label,
  className,
}: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        styles[status],
        className
      )}
    >
      {icons[status]}
      {label ?? defaultLabels[status]}
    </span>
  );
};

export default StatusBadge;