interface SidebarProps {
  role: "patient" | "doctor" | "admin";
}

const Sidebar = ({ role }: SidebarProps) => {
  return (
    <aside>
      <h3>{role.toUpperCase()} MENU</h3>
    </aside>
  );
};

export default Sidebar;