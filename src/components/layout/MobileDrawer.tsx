import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AppLogo from "@/components/common/Applogo";
import {
  sidebarItems,
  commonSidebarItems,
} from "@/components/layout/config/sidebarItems";
import { useAuthStore } from "@/store/authStore";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MobileDrawer = ({
  open,
  onClose,
}: MobileDrawerProps) => {
  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const role =
    useAuthStore(
      (state) => state.role
    ) ?? "PATIENT";

  const items =
    sidebarItems[role];

  if (!open) return null;

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login", {
      replace: true,
    });
  };
  return (

    <>
      {/* ============================= */}
      {/* Backdrop */}
      {/* ============================= */}

      <div
        onClick={onClose}
        className="
          fixed
          inset-0
          z-40
          bg-black/40
          backdrop-blur-sm
          lg:hidden
        "
      />

      {/* ============================= */}
      {/* Drawer */}
      {/* ============================= */}

      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-80
          flex-col
          border-r
          border-outline-variant
          bg-background
          shadow-2xl
          lg:hidden
        "
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-outline-variant
            p-5
          "
        >

          <AppLogo size="sm" />

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2
              transition-colors
              hover:bg-surface-container
            "
          >

            <X size={22} />

          </button>

        </div>
                {/* ============================= */}
        {/* User Info */}
        {/* ============================= */}

        {user && (

          <div
            className="
              border-b
              border-outline-variant
              p-5
            "
          >

            <div className="flex items-center gap-4">

              {/* Avatar */}

              <div
                className="
                  flex
                  h-14
                  w-14
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

              <div className="min-w-0 flex-1">

                <h3
                  className="
                    truncate
                    font-semibold
                    text-on-background
                  "
                >
                  {user.firstName} {user.lastName}
                </h3>

                <p
                  className="
                    truncate
                    text-sm
                    text-on-surface-variant
                  "
                >
                  {user.email}
                </p>

                <span
                  className="
                    mt-2
                    inline-flex
                    rounded-full
                    bg-primary/10
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-primary
                  "
                >
                  {role}
                </span>

              </div>

            </div>

          </div>

        )}

        {/* ============================= */}
        {/* Navigation */}
        {/* ============================= */}

        <nav className="flex-1 overflow-y-auto p-4">

          <div className="space-y-2">

            {items.map((item) => {

              const Icon = item.icon;

              return (

                <Link
                  key={item.title}
                  to={item.path}
                  onClick={onClose}
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-4
                    py-3
                    font-medium
                    text-on-background
                    transition-all
                    duration-200
                    hover:bg-surface-container
                  "
                >

                  <Icon
                    size={20}
                    className="text-primary"
                  />

                  <span>

                    {item.title}

                  </span>

                </Link>

              );

            })}

          </div>

        </nav>
                {/* ============================= */}
        {/* Footer */}
        {/* ============================= */}

        <div
          className="
            border-t
            border-outline-variant
            p-4
          "
        >

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
                  px-4
                  py-3
                  text-left
                  transition-all
                  duration-200
                  hover:bg-red-50
                  dark:hover:bg-red-950/20
                "
              >

                <Icon
                  size={20}
                  className="text-red-500"
                />

                <span
                  className="
                    font-medium
                    text-red-500
                  "
                >
                  {item.title}
                </span>

              </button>

            );

          })}

        </div>
              </aside>
    </>
  );
};

export default MobileDrawer;

/*
======================================================

Future Improvements

✓ Active Navigation Highlight
✓ Slide Animation
✓ Swipe to Close
✓ Notification Badge
✓ Theme Toggle
✓ User Avatar Image
✓ Search Navigation

======================================================
*/
