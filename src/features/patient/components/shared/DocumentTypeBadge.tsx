import { motion } from "framer-motion";
import clsx from "clsx";
import {
  Activity,
  ClipboardList,
  FileBarChart,
  FileHeart,
  FileText,
  HeartPulse,
  Microscope,
  Shield,
  Syringe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { DocumentType } from "../../types";

interface DocumentTypeBadgeProps {
  type: DocumentType;
  size?: "sm" | "md";
  className?: string;
}

interface BadgeConfig {
  label: string;
  icon: LucideIcon;
  container: string;
  iconColor: string;
}

const DOCUMENT_CONFIG: Record<string, BadgeConfig> = {
  PRESCRIPTION: {
    label: "Prescription",
    icon: ClipboardList,
    container:
      "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 text-blue-700",
    iconColor: "text-blue-600",
  },

  LAB_REPORT: {
    label: "Lab Report",
    icon: Microscope,
    container:
      "bg-gradient-to-r from-cyan-50 to-sky-50 border border-cyan-100 text-cyan-700",
    iconColor: "text-cyan-600",
  },

  CONSULTATION: {
    label: "Consultation",
    icon: FileText,
    container:
      "bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 text-violet-700",
    iconColor: "text-violet-600",
  },

  DISCHARGE_SUMMARY: {
    label: "Discharge",
    icon: FileHeart,
    container:
      "bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 text-emerald-700",
    iconColor: "text-emerald-600",
  },

  IMAGING: {
    label: "Imaging",
    icon: Activity,
    container:
      "bg-gradient-to-r from-indigo-50 to-sky-50 border border-indigo-100 text-indigo-700",
    iconColor: "text-indigo-600",
  },

  INSURANCE: {
    label: "Insurance",
    icon: Shield,
    container:
      "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 text-amber-700",
    iconColor: "text-amber-600",
  },

  VACCINATION: {
    label: "Vaccination",
    icon: Syringe,
    container:
      "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 text-green-700",
    iconColor: "text-green-600",
  },

  HEALTH_SUMMARY: {
    label: "Health Summary",
    icon: HeartPulse,
    container:
      "bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-100 text-pink-700",
    iconColor: "text-pink-600",
  },

  OTHER: {
    label: "Other",
    icon: FileBarChart,
    container:
      "bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-100 text-slate-700",
    iconColor: "text-slate-600",
  },
};

const SIZE = {
  sm: {
    wrapper: "px-2.5 py-1 rounded-full gap-1.5 text-xs",
    icon: "w-3.5 h-3.5",
  },

  md: {
    wrapper: "px-3 py-1.5 rounded-full gap-2 text-sm",
    icon: "w-4 h-4",
  },
};

export default function DocumentTypeBadge({
  type,
  size = "sm",
  className,
}: DocumentTypeBadgeProps) {
  const config = DOCUMENT_CONFIG[type];

  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
      }}
      transition={{
        duration: 0.2,
      }}
      className={clsx(
        "inline-flex items-center font-medium backdrop-blur-sm shadow-sm",
        config.container,
        SIZE[size].wrapper,
        className
      )}
    >
      <Icon
        className={clsx(
          SIZE[size].icon,
          config.iconColor
        )}
      />

      {config.label}
    </motion.div>
  );
}