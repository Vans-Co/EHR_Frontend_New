import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Bell, ChevronDown, Menu, Search, Stethoscope, User as UserIcon } from "lucide-react";

import { format } from "date-fns";

import { useAuthStore } from "@/store/authStore";

import AppLogo from "@/components/common/Applogo";

import NotificationDropdown from "@/components/layout/NotificationDropdown";
import UserMenu from "@/components/layout/UserMenu";

import useNotifications from "@/hooks/useNotifications";
import useDebounce from "@/hooks/useDebounce";
import {
  searchService,
  type DoctorSearchResult,
  type PatientSearchResult,
} from "@/services/search.service";

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

  const navigate = useNavigate();

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  const [showUserMenu, setShowUserMenu] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    unreadCount,
    loading: notificationsLoading,
    refresh: refreshNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  /* ---- global search (role-aware) ---- */

  const isDoctorSide = user.role === "DOCTOR" || user.role === "ADMIN";

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [patientResults, setPatientResults] = useState<PatientSearchResult[]>([]);
  const [doctorResults, setDoctorResults] = useState<DoctorSearchResult[]>([]);

  const debouncedQuery = useDebounce(searchQuery.trim(), 350);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setPatientResults([]);
      setDoctorResults([]);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        if (isDoctorSide) {
          const results = await searchService.searchPatients(debouncedQuery);
          if (!cancelled) setPatientResults(results.slice(0, 8));
        } else {
          const results = await searchService.searchDoctors(debouncedQuery);
          if (!cancelled) setDoctorResults(results.slice(0, 8));
        }
      } catch {
        /* results stay empty */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, isDoctorSide]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setPatientResults([]);
    setDoctorResults([]);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }

      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const greeting = (() => {

    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 12) return "Good Morning";

    if (hour < 17) return "Good Afternoon";
    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  })();

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-16
        lg:h-20
        items-center
        justify-between
        border-b
        border-outline-variant
        bg-background/90
        px-4
        lg:px-6
        backdrop-blur-xl
      "
    >

      {/* ========================= */}
      {/* Left Section */}
      {/* ========================= */}

      <div className="flex items-center gap-3 lg:gap-5">

        {/* Mobile Menu */}

        <button
          type="button"
          onClick={onMenuClick}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            transition-all
            hover:bg-primary/10
            lg:hidden
          "
        >
          <Menu size={22} className="text-on-background" />
        </button>

        {/* Mobile Logo */}

        <div className="lg:hidden">
          <AppLogo size="xs" clickable />
        </div>

        {/* Desktop Greeting */}

        <div className="hidden lg:block">

          <h2 className="text-2xl font-bold text-on-background">

            {greeting} {user.firstName} 👋

          </h2>

          <p className="mt-1 text-sm text-on-surface-variant">
            {format(new Date(), "EEEE, dd MMMM yyyy")}
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
        <div className="relative" ref={searchRef}>
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
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder={
              isDoctorSide
                ? "Search patients by name, email or EHR id..."
                : "Search doctors by name or specialization..."
            }
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

          {searchOpen && debouncedQuery.length >= 2 && (
            <div
              className="
                absolute
                left-0
                right-0
                top-14
                z-50
                overflow-hidden
                rounded-2xl
                border
                border-outline-variant
                bg-background/95
                shadow-[0_20px_60px_rgba(15,23,42,0.18)]
                backdrop-blur-xl
              "
            >

              {isDoctorSide &&
                patientResults.map((p) => (
                  <button
                    key={p.ehrId}
                    type="button"
                    onClick={() => {
                      closeSearch();
                      navigate(`/doctor/patients?q=${encodeURIComponent(p.ehrId)}`);
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      border-b
                      border-outline-variant
                      px-5
                      py-3
                      text-left
                      transition-colors
                      hover:bg-primary/5
                    "
                  >
                    <UserIcon size={16} className="shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-on-background">
                        {`${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || p.ehrId}
                      </p>
                      <p className="truncate text-xs text-on-surface-variant">
                        {p.email} · {p.ehrId}
                      </p>
                    </div>
                  </button>
                ))}

              {!isDoctorSide &&
                doctorResults.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      closeSearch();
                      navigate("/patient/appointments", {
                        state: { doctorName: `Dr. ${d.firstName ?? ""} ${d.lastName ?? ""}`.trim() },
                      });
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      border-b
                      border-outline-variant
                      px-5
                      py-3
                      text-left
                      transition-colors
                      hover:bg-primary/5
                    "
                  >
                    <Stethoscope size={16} className="shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-on-background">
                        Dr. {`${d.firstName ?? ""} ${d.lastName ?? ""}`.trim()}
                      </p>
                      <p className="truncate text-xs text-on-surface-variant">
                        {d.specialization || "General"}
                      </p>
                    </div>
                  </button>
                ))}

              {((isDoctorSide && patientResults.length === 0) ||
                (!isDoctorSide && doctorResults.length === 0)) && (
                <p className="px-5 py-4 text-sm text-on-surface-variant">
                  No results for "{debouncedQuery}"
                </p>
              )}

            </div>
          )}
        </div>
      </div>

      {/* ========================= */}
      {/* Right Section */}
      {/* ========================= */}

      <div className="flex items-center gap-2 lg:gap-4">

        {/* Notifications */}

        <div
          className="relative"
          ref={notificationRef}
        >

          <button
            type="button"
            onClick={() => {

              if (!showNotifications) {
                refreshNotifications();
              }

              setShowNotifications(
                !showNotifications
              );

              setShowUserMenu(false);

            }}
            className="
              relative
              flex
              h-10
              w-10
              lg:h-11
              lg:w-11
              items-center
              justify-center
              rounded-xl
              transition-all
              duration-300
              hover:bg-primary/10
            "
          >

            <Bell
              size={21}
              className="text-on-background"
            />

            {unreadCount > 0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                "
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}

          </button>

          {showNotifications && (
            <NotificationDropdown
              notifications={notifications}
              unreadCount={unreadCount}
              loading={notificationsLoading}
              onMarkAsRead={markAsRead}
              onMarkAllAsRead={markAllAsRead}
            />
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

        {/* User */}

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

            <div
              className="
                flex
                h-10
                w-10
                lg:h-11
                lg:w-11
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
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </div>

            <div className="hidden text-left md:block">
              <p className="font-semibold text-on-background">

                {user.firstName} {user.lastName}

              </p>

              <p className="text-xs text-on-surface-variant">

                {user.role}

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
