import {
  CalendarCheck,
  Pill,
  FileText,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
}

export const notificationItems: NotificationItem[] = [
  {
    id: 1,
    title: "Appointment Confirmed",
    description: "Dr. Sharma confirmed your appointment.",
    time: "5 min ago",
    icon: CalendarCheck,
  },

  {
    id: 2,
    title: "Prescription Uploaded",
    description: "Your prescription is now available.",
    time: "30 min ago",
    icon: Pill,
  },

  {
    id: 3,
    title: "Lab Report Ready",
    description: "Blood Test report has been uploaded.",
    time: "2 hrs ago",
    icon: FileText,
  },

  {
    id: 4,
    title: "Payment Successful",
    description: "₹1200 payment received successfully.",
    time: "Yesterday",
    icon: CreditCard,
  },
];
