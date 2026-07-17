import { NavLink } from "react-router-dom";

import {
  sidebarItems,
} from "@/components/layout/config/sidebarItems";

import { useAuthStore } from "@/store/authStore";

const MobileBottomNav = () => {

  const role =
    useAuthStore(
      (state) => state.role
    ) ?? "PATIENT";

  /*
    Show only the first 5 items.

    Example

    Patient

    Dashboard
    Appointments
    Medical Records
    Billing
    Profile
  */

  const items =
    sidebarItems[role].slice(0, 5);

  return (

    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-outline-variant
        bg-background/95
        backdrop-blur-lg
        lg:hidden
      "
    >

      <div
        className="
          grid
          grid-cols-5
        "
      >
                {items.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  py-3
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "text-primary"
                      : "text-on-surface-variant hover:text-primary"
                  }
                `
              }
            >

              {({ isActive }) => (

                <>

                  <Icon
                    size={22}
                    className={
                      isActive
                        ? "text-primary"
                        : "text-on-surface-variant"
                    }
                  />

                  <span
                    className="
                      text-[11px]
                      font-medium
                    "
                  >
                    {item.title}
                  </span>

                </>

              )}

            </NavLink>

          );

        })}
              </div>

    </nav>

  );
};

export default MobileBottomNav;

/*
==========================================================
Future Improvements

✓ Notification Badge
✓ Floating Center Action Button
✓ Haptic Feedback (PWA)
✓ Active Tab Animation
✓ Role-based Bottom Navigation
✓ Mobile Short Labels
✓ Dark Mode Optimization

==========================================================
*/