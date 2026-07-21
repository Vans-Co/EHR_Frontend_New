import { NavLink, useNavigate } from "react-router-dom";

import AppLogo from "@/components/common/Applogo";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

import {
  sidebarItems,
  commonSidebarItems,
} from "@/components/layout/config/sidebarItems";

const Sidebar = () => {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const role =
    useAuthStore((state) => state.role) ??
    "PATIENT";

  const logout = useAuthStore(
    (state) => state.logout
  );

  const items = sidebarItems[role];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className="
        flex
        h-screen
        w-72
        shrink-0
        flex-col
        bg-background
      "
    >
      {/* ========================= */}
      {/* Logo */}
      {/* ========================= */}

      <div
        className="
          flex
          items-center
          justify-center
          px-6
          pt-7
          pb-5
        "
      >
        <AppLogo
          size="xl"
          clickable
        />
      </div>

      {/* ========================= */}
      {/* User Card */}
      {/* ========================= */}

      {user && (
        <div className="px-4">
          <div
            className="
              rounded-3xl
              bg-surface-container
              p-6
              shadow-sm
            "
          >
            <div className="flex flex-col items-center">

              {/* Avatar */}

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-primary
                  text-lg
                  font-bold
                  text-white
                "
              >
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>

              {/* Name */}

              <h2 className="mt-4 text-center text-lg font-bold text-on-background">
                {user.firstName}{" "}
                {user.lastName}
              </h2>

              {/* Email */}

              <p className="mt-1 truncate text-xs text-on-surface-variant">
                {user.email}
              </p>

              {/* Role */}

              <div
                className="
                  mt-4
                  rounded-full
                  bg-primary/10
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-primary
                "
              >
                ✨ Patient Portal
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================= */}
      {/* Navigation */}
      {/* ========================= */}

      <nav
        className="
          flex-1
          min-h-0
          overflow-y-auto
          px-4
          py-5
        "
      >
        <div className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-4 rounded-2xl px-4 py-3 font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-white shadow-lg"
                      : "text-on-surface-variant hover:bg-primary/10 hover:text-on-background"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={20}
                      className={
                        isActive
                          ? "text-white"
                          : "text-primary"
                      }
                    />

                    <span>{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* ========================= */}
      {/* Logout */}
      {/* ========================= */}

      <div className="mt-auto px-4 pb-6">
        {commonSidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              type="button"
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                border
                border-red-200
                px-4
                py-3
                font-medium
                text-red-500
                transition-all
                duration-300
                hover:bg-red-50
                dark:border-red-900/40
                dark:hover:bg-red-950/20
              "
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;