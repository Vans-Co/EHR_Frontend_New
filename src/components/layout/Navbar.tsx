import { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

import AppLogo from "@/components/common/Applogo";
import NotificationDropdown from "@/components/layout/NotificationDropdown";
import UserMenu from "@/components/layout/UserMenu";
import { useAuthStore } from "@/store/authStore";

interface NavbarProps {
  onMenuClick?: () => void;
}

const Navbar = ({
  onMenuClick,
}: NavbarProps) => {
  const authUser = useAuthStore(
    (state) => state.user
  );

  const user =
    authUser ?? {
      firstName: "Patient",
      lastName: "",
      email: "patient@demo.com",
      role: "PATIENT",
    };

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);
  const [showUserMenu, setShowUserMenu] =
    useState(false);

  const notificationRef =
    useRef<HTMLDivElement>(null);
  const userMenuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {
        setShowNotifications(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(
          event.target as Node
        )
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const greeting = (() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 17) {
      return "Good Afternoon";
    }

    return "Good Evening";
  })();

  return (
    <header className="flex min-h-16 w-full flex-wrap items-start justify-between gap-3 border-b border-outline-variant bg-background/90 px-4 py-3 backdrop-blur-xl lg:px-6">
      <div className="flex min-w-0 items-center gap-3 lg:gap-5">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-all hover:bg-primary/10 lg:hidden"
        >
          <Menu
            size={22}
            className="text-on-background"
          />
        </button>

        <div className="lg:hidden">
          <AppLogo size="xs" clickable />
        </div>

        <div className="hidden min-w-0 xl:block">
          <h2 className="truncate text-2xl font-bold text-on-background">
            {greeting} {user.firstName}
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            {format(
              new Date(),
              "EEEE, dd MMMM yyyy"
            )}
          </p>
        </div>
      </div>

      <div className="order-3 hidden w-full min-w-[240px] flex-1 lg:order-none lg:mx-4 lg:block lg:max-w-xl xl:max-w-2xl">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />

          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            className="h-12 w-full rounded-2xl border border-outline-variant bg-surface-container-lowest pl-12 pr-5 text-sm text-on-background outline-none transition-all duration-300 focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">
        <div
          className="relative"
          ref={notificationRef}
        >
          <button
            type="button"
            onClick={() => {
              setShowNotifications(
                !showNotifications
              );
              setShowUserMenu(false);
            }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 hover:bg-primary/10 lg:h-11 lg:w-11"
          >
            <Bell
              size={21}
              className="text-on-background"
            />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          {showNotifications && (
            <NotificationDropdown />
          )}
        </div>

        <div className="hidden h-8 w-px bg-outline-variant md:block" />

        <div
          className="relative"
          ref={userMenuRef}
        >
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex max-w-full items-center gap-3 rounded-2xl px-2 py-2 transition-all duration-300 hover:bg-primary/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md lg:h-11 lg:w-11">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>

            <div className="hidden max-w-[180px] text-left md:block lg:max-w-[220px]">
              <p className="truncate font-semibold text-on-background">
                {user.firstName} {user.lastName}
              </p>

              <p className="truncate text-xs text-on-surface-variant">
                {user.role}
              </p>
            </div>

            <ChevronDown
              size={18}
              className="hidden text-on-surface-variant md:block"
            />
          </button>

          {showUserMenu && <UserMenu />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
