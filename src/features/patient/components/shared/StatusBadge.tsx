import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  Archive,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import clsx from "clsx";

export type StatusType =
  | "verified"
  | "pending"
  | "rejected"
  | "archived"
  | "uploaded"
  | "processing";

interface StatusBadgeProps {
  status: StatusType;
  size?: "sm" | "md";
  showIcon?: boolean;
  className?: string;
}

interface StatusConfig {
  label: string;
  icon: LucideIcon;
  container: string;
  iconColor: string;
}

const STATUS_CONFIG: Record<StatusType, StatusConfig> = {
  verified: {
    label: "Verified",
    icon: ShieldCheck,
    container:
      "bg-emerald-50 border border-emerald-200 text-emerald-700",
    iconColor: "text-emerald-500",
  },

  uploaded: {
    label: "Uploaded",
    icon: CheckCircle2,
    container:
      "bg-cyan-50 border border-cyan-200 text-cyan-700",
    iconColor: "text-cyan-500",
  },

  pending: {
    label: "Pending",
    icon: Clock3,
    container:
      "bg-amber-50 border border-amber-200 text-amber-700",
    iconColor: "text-amber-500",
  },

  processing: {
    label: "Processing",
    icon: Clock3,
    container:
      "bg-blue-50 border border-blue-200 text-blue-700",
    iconColor: "text-blue-500",
  },

  rejected: {
    label: "Rejected",
    icon: XCircle,
    container:
      "bg-red-50 border border-red-200 text-red-700",
    iconColor: "text-red-500",
  },

  archived: {
    label: "Archived",
    icon: Archive,
    container:
      "bg-slate-100 border border-slate-200 text-slate-600",
    iconColor: "text-slate-500",
  },
};

const SIZE_CLASSES = {
  sm: {
    wrapper: "px-2.5 py-1 text-xs gap-1 rounded-full",
    icon: "w-3.5 h-3.5",
  },
  md: {
    wrapper: "px-3 py-1.5 text-sm gap-2 rounded-full",
    icon: "w-4 h-4",
  },
};

export default function StatusBadge({
  status,
  size = "sm",
  showIcon = true,
  className,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{
        scale: 1.04,
      }}
      transition={{
        duration: 0.2,
      }}
      className={clsx(
        "inline-flex items-center font-medium backdrop-blur-sm shadow-sm",
        config.container,
        SIZE_CLASSES[size].wrapper,
        className
      )}
    >
      {showIcon && (
        <Icon
          className={clsx(
            SIZE_CLASSES[size].icon,
            config.iconColor
          )}
        />
      )}

      {config.label}
    </motion.div>
  );
}