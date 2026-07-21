import { NavLink } from "react-router-dom";

import { sidebarItems } from "@/components/layout/config/sidebarItems";
import { useAuthStore } from "@/store/authStore";

interface MobileBottomNavProps {
  hidden?: boolean;
}

const MobileBottomNav = ({
  hidden = false,
}: MobileBottomNavProps) => {
  const role =
    useAuthStore((state) => state.role) ??
    "PATIENT";

  if (hidden) return null;

  const items = sidebarItems[role].slice(0, 5);

  const mobileLabels: Record<string, string> = {
    Dashboard: "Home",
    Appointments: "Visits",
    "Medical Records": "Records",
    Prescription: "Meds",
    Billing: "Bills",
    Insurance: "Cover",
    Profile: "Profile",
    Settings: "Settings",
  };

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        lg:hidden
        border-t
        border-slate-200
        bg-white/95
        backdrop-blur-xl
        shadow-[0_-8px_24px_rgba(0,0,0,.08)]
        rounded-t-3xl
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <div className="grid grid-cols-5 px-2 py-2">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
            >
              {({ isActive }) => (
                <div
                  className={`
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    rounded-2xl
                    px-2
                    py-2
                    transition-all
                    duration-300

                    ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-slate-500 hover:bg-slate-100"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    strokeWidth={2.2}
                  />

                  <span
                    className={`
                      text-[10px]
                      font-medium
                      leading-none

                      ${
                        isActive
                          ? "text-primary"
                          : "text-slate-600"
                      }
                    `}
                  >
                    {mobileLabels[item.title] ??
                      item.title}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
