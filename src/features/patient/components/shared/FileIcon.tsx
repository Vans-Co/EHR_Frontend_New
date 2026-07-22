import { motion } from "framer-motion";
import {
  File,
  FileImage,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import clsx from "clsx";

type FileType =
  | "pdf"
  | "doc"
  | "docx"
  | "png"
  | "jpg"
  | "jpeg"
  | "xls"
  | "xlsx"
  | "unknown";

interface FileIconProps {
  type?: FileType;
  fileName?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: {
    container: "w-10 h-10 rounded-xl",
    icon: "w-5 h-5",
  },
  md: {
    container: "w-14 h-14 rounded-2xl",
    icon: "w-7 h-7",
  },
  lg: {
    container: "w-16 h-16 rounded-2xl",
    icon: "w-8 h-8",
  },
};

export default function FileIcon({
  type,
  fileName,
  size = "md",
  animated = true,
  className,
}: FileIconProps) {
  const extension =
    type ??
    fileName?.split(".").pop()?.toLowerCase() ??
    "unknown";

  let Icon = File;
  let background = "";
  let iconColor = "";

  switch (extension) {
    case "pdf":
      Icon = FileText;
      background =
        "bg-gradient-to-br from-red-100 via-red-50 to-orange-100";
      iconColor = "text-red-500";
      break;

    case "doc":
    case "docx":
      Icon = FileText;
      background =
        "bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100";
      iconColor = "text-blue-600";
      break;

    case "png":
    case "jpg":
    case "jpeg":
      Icon = FileImage;
      background =
        "bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100";
      iconColor = "text-emerald-600";
      break;

    case "xls":
    case "xlsx":
      Icon = FileSpreadsheet;
      background =
        "bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100";
      iconColor = "text-green-600";
      break;

    default:
      Icon = File;
      background =
        "bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200";
      iconColor = "text-slate-500";
  }

  const Component = animated ? motion.div : "div";

  return (
    <Component
      whileHover={
        animated
          ? {
              scale: 1.05,
              y: -2,
            }
          : undefined
      }
      transition={{
        duration: 0.2,
      }}
      className={clsx(
        "flex items-center justify-center",
        "border border-white/60",
        "shadow-lg shadow-sky-100/50",
        "backdrop-blur-md",
        background,
        sizeClasses[size].container,
        className
      )}
    >
      <Icon
        className={clsx(
          sizeClasses[size].icon,
          iconColor
        )}
      />
    </Component>
  );
}