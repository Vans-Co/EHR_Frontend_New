import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Globe,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  UserCircle2,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

type DashboardNavbarProps = {
  notificationCount?: number;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  showPageTitle?: boolean;
};

const routeTitleMap: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/appointments": "Appointments",
  "/medical-records": "Medical Records",
  "/records": "Medical Records",
  "/prescriptions": "Prescriptions",
  "/billing": "Billing",
  "/billing-payments": "Billing & Payments",
  "/insurance": "Insurance",
  "/profile": "Profile",
  "/settings": "Settings",
};

export default function DashboardNavbar({
  notificationCount = 0,
  onMenuClick,
  onSearchClick,
  showPageTitle = true,
}: DashboardNavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageTitle = useMemo(() => {
    const [, maybeRole, ...rest] = location.pathname.split("/");
    const key = ["patient", "doctor", "admin"].includes(maybeRole) ? `/${rest.join("/")}` || "/" : location.pathname;
    return routeTitleMap[key] || "Dashboard";
  }, [location.pathname]);

  const initials = useMemo(() => {
    const first = user?.firstName?.[0] ?? "";
    const last = user?.lastName?.[0] ?? "";
    return `${first}${last}`.toUpperCase() || "U";
  }, [user]);

  const rolePath = useMemo(() => {
    return user?.role?.toLowerCase().replace("_", "-") ?? "";
  }, [user?.role]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate("/login");
  };

  const handleThemeToggle = () => {
    const nextTheme = !isDarkMode;

    setIsDarkMode(nextTheme);

    localStorage.setItem(
      "theme",
      nextTheme ? "dark" : "light"
    );

    document.documentElement.classList.toggle(
      "dark",
      nextTheme
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 md:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link
            to="/"
            onClick={() => setIsProfileOpen(false)}
            className="flex shrink-0 items-center gap-2 rounded-lg px-1 py-1 text-slate-900 transition hover:opacity-80 dark:text-white"
          >
            <span className="text-lg">🏥</span>
            <span className="text-lg font-bold">Vans Healthcare</span>
          </Link>

          {showPageTitle && (
            <div className="hidden min-w-0 items-center gap-3 md:flex">
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
              <h1 className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                {pageTitle}
              </h1>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients, appointments, records..."
              className="h-10 w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-500 dark:focus:bg-slate-950 lg:w-72"
            />
          </div>

          <button
            type="button"
            onClick={onSearchClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 md:hidden dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={handleThemeToggle}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            className="hidden h-10 items-center justify-center rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 md:inline-flex"
            aria-label="Change language"
          >
            <Globe className="mr-2 h-4 w-4" />
            EN
          </button>

          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
            )}
          </button>

          <div
            className="relative"
            ref={dropdownRef}
          >
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 py-1.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              aria-label="Open profile menu"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <div className="hidden text-left sm:block">
                <p className="max-w-[140px] truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="max-w-[140px] truncate text-xs text-slate-500 dark:text-slate-400">
                  {user?.role}
                </p>
              </div>

              <ChevronDown className="hidden h-4 w-4 text-slate-500 sm:block dark:text-slate-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {user?.role}
                  </p>
                  <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                    {user?.email}
                  </p>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      if (rolePath) {
                        navigate(`/${rolePath}/profile`);
                      }
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <UserCircle2 className="h-4 w-4" />
                    Profile
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      if (rolePath) {
                        navigate(`/${rolePath}/settings`);
                      }
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}