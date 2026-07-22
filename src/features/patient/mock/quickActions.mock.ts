import {
  Building2,
  Download,
  FilePlus2,
  Share2,
} from "lucide-react";

import type { QuickAction } from "../types";

export const quickActions: QuickAction[] = [
  {
    id: "upload-record",
    title: "Upload Record",
    description: "Upload your medical records",
    icon: FilePlus2,
    color: "#2563EB",
    action: "upload",
  },
  {
    id: "download-summary",
    title: "Download Summary",
    description: "Download your complete health summary",
    icon: Download,
    color: "#16A34A",
    action: "download-summary",
  },
  {
    id: "share-records",
    title: "Share Records",
    description: "Securely share records with your doctor",
    icon: Share2,
    color: "#EA580C",
    action: "share-records",
  },
  {
    id: "request-records",
    title: "Request Records",
    description: "Request records from your hospital",
    icon: Building2,
    color: "#7C3AED",
    action: "request-records",
  },
];