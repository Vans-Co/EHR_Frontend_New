import { Outlet } from "react-router-dom";

import Sidebar from "@/components/common/Sidebar/Sidebar";
import DashboardNavbar from "@/components/common/DashboardNavbar/DashboardNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardNavbar notificationCount={8} />

      <div className="flex">
        <Sidebar role="ADMIN" />

        <main className="flex-1 pt-20 lg:ml-64">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;