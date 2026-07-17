import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppButtonProps
  extends React.ComponentProps<typeof Button> {
  loading?: boolean;
}

const AppButton = ({
  children,
  className,
  loading = false,
  disabled,
  ...props
}: AppButtonProps) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn(
        "h-12 rounded-2xl",
        "font-semibold",
        "text-sm",
        "transition-all duration-300",
        "active:scale-[0.98]",
        "shadow-md",
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}

      {children}
    </Button>
  );
};

export default AppButton;