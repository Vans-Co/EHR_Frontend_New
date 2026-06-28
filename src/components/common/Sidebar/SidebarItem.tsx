import { NavLink } from "react-router-dom";
import type { SidebarConfigItem } from "./sidebarConfig";

type SidebarItemProps = SidebarConfigItem;

const SidebarItem = ({ label, path, icon: Icon }: SidebarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;