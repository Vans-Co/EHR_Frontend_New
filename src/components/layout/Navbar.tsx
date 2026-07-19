import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bell,
  ChevronDown,
  Menu,
  Search,
} from "lucide-react";

import { format } from "date-fns";

import { useAuthStore } from "@/store/authStore";

import AppLogo from "@/components/common/Applogo";

import NotificationDropdown from "@/components/layout/NotificationDropdown";
import UserMenu from "@/components/layout/UserMenu";

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

  const [
    showUserMenu,
    setShowUserMenu,
  ] = useState(false);

  const notificationRef =
    useRef<HTMLDivElement>(null);

  const userMenuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleClickOutside = (
      event: MouseEvent
    ) => {

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

    const hour =
      new Date().getHours();

    if (hour < 12)
      return "Good Morning";

    if (hour < 17)
      return "Good Afternoon";

    return "Good Evening";

  })();

  return (

    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-20
        items-center
        justify-between
        border-b
        border-outline-variant
        bg-background/90
        px-6
        backdrop-blur-xl
      "
    >
            {/* ========================= */}
      {/* Left Section */}
      {/* ========================= */}

      <div className="flex items-center gap-5">

        {/* Mobile Menu */}

        <button
          type="button"
          onClick={onMenuClick}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            transition-all
            hover:bg-primary/10
            lg:hidden
          "
        >
          <Menu
            size={22}
            className="text-on-background"
          />
        </button>

        {/* Mobile Logo */}

        <div className="lg:hidden">
          <AppLogo
            size="xs"
            clickable
          />
        </div>

        {/* Greeting */}

        <div>

          <h2 className="text-2xl font-bold text-on-background">

            {greeting}

            {user && (
              <>
                {" "}
                {user.firstName}
              </>
            )}

            👋

          </h2>

          <p className="mt-1 text-sm text-on-surface-variant">

            {format(
              new Date(),
              "EEEE, dd MMMM yyyy"
            )}

          </p>

        </div>

      </div>

      {/* ========================= */}
      {/* Search */}
      {/* ========================= */}

      <div
        className="
          mx-8
          hidden
          max-w-2xl
          flex-1
          lg:block
        "
      >

        <div className="relative">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-on-surface-variant
            "
          />

          <input
            type="text"
            placeholder="Search patients, doctors, appointments..."
            className="
              h-12
              w-full
              rounded-2xl
              border
              border-outline-variant
              bg-surface-container-lowest
              pl-12
              pr-5
              text-sm
              text-on-background
              outline-none
              transition-all
              duration-300
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
            "
          />

        </div>

      </div>

      {/* ========================= */}
      {/* Right Section */}
      {/* ========================= */}

      <div className="flex items-center gap-4">
                {/* ========================= */}
        {/* Notifications */}
        {/* ========================= */}

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
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              transition-all
              duration-300
              hover:bg-primary/10
            "
          >
            <Bell
              size={22}
              className="text-on-background"
            />

            {/* Notification Badge */}

            <span
              className="
                absolute
                right-2
                top-2
                flex
                h-2.5
                w-2.5
                rounded-full
                bg-red-500
              "
            />
          </button>

          {showNotifications && (
            <NotificationDropdown />
          )}
        </div>

        {/* Divider */}

        <div
          className="
            hidden
            h-8
            w-px
            bg-outline-variant
            md:block
          "
        />

        {/* ========================= */}
        {/* User Profile */}
        {/* ========================= */}

        <div
          className="relative"
          ref={userMenuRef}
        >
          <button
            type="button"
            onClick={() => {
              setShowUserMenu(
                !showUserMenu
              );

              setShowNotifications(
                false
              );
            }}
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              px-2
              py-2
              transition-all
              duration-300
              hover:bg-primary/10
            "
          >
            {/* Avatar */}

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-primary
                text-sm
                font-bold
                text-white
                shadow-md
              "
            >
              {user?.firstName.charAt(0)}
              {user?.lastName.charAt(0)}
            </div>

            {/* User Info */}

            <div className="hidden text-left md:block">

              <p className="font-semibold text-on-background">

                {user?.firstName}{" "}
                {user?.lastName}

              </p>

              <p className="text-xs text-on-surface-variant">

                {user?.role}

              </p>

            </div>

            <ChevronDown
              size={18}
              className="hidden text-on-surface-variant md:block"
            />
          </button>

          {showUserMenu && (
            <UserMenu />
          )}
        </div>

      </div>
          </header>

  );

};

export default Navbar;