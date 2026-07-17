import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({
  children,
  className,
}: GlassCardProps) => {
  return (
    <div
      className={cn(
        // Layout
        "relative w-full",

        // Card
        "rounded-3xl",

        // Glass
        "bg-white/85",
        "backdrop-blur-xl",

        // Border
        "border border-white/40",

        // Shadow
        "shadow-[0_10px_40px_rgba(15,23,42,0.08)]",

        // Padding
        "p-6 md:p-8",

        // Animation
        "transition-all duration-300",

        // Hover
        "hover:-translate-y-1",
        "hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)]",

        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;