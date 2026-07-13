import { LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";
import {
  sidebarConfig,
  type DashboardRole,
  type SidebarSection,
} from "./sidebarConfig";

type SidebarProps = {
  role: DashboardRole;
};

const sections: SidebarSection[] = [
  "Main",
  "Clinical",
  "Finance",
  "Management",
  "Account",
];

const Sidebar = ({ role }: SidebarProps) => {
  const items = sidebarConfig[role];

  return (
    <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {sections.map((section) => {
          const sectionItems = items.filter(
            (item) => item.section === section
          );

          if (!sectionItems.length) return null;

          return (
            <div key={section} className="mb-6">
              <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {section}
              </h3>

              <div className="space-y-1">
                {sectionItems.map((item) => (
                  <SidebarItem
                    key={item.id}
                    {...item}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

        <button type="button" onClick={() => { localStorage.removeItem("accessToken"); localStorage.removeItem("refreshToken"); localStorage.removeItem("user"); window.location.assign("/login"); }} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
    </aside>
  );
};

export default Sidebar;
