import { Link } from "react-router-dom";
import logo from "@/assets/images/Logo.png";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  clickable?: boolean;
  collapsed?: boolean;
  className?: string;
}

const logoSizes = {
  xs: "h-9",
  sm: "h-11",
  md: "h-14",
  lg: "h-18",
  xl: "h-20",
};

const AppLogo = ({
  size = "md",
  clickable = true,
  collapsed = false,
  className,
}: AppLogoProps) => {
  const image = (
    <img
      src={logo}
      alt="Vans Digital Healthcare"
      className={cn(
        logoSizes[size],
        collapsed ? "w-12 object-cover" : "w-auto object-contain",
        "select-none transition-all duration-300",
        className
      )}
      draggable={false}
    />
  );

  if (!clickable) {
    return image;
  }

  return (
    <Link
      to="/"
      aria-label="Vans Healthcare"
      className="inline-flex items-center transition-opacity duration-200 hover:opacity-90"
    >
      {image}
    </Link>
  );
};

export default AppLogo;