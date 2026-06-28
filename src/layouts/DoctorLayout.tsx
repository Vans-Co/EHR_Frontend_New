import { Outlet } from "react-router-dom";

import Sidebar from "@/components/common/Sidebar/Sidebar";
import DashboardNavbar from "@/components/common/DashboardNavbar/DashboardNavbar";

const DoctorLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardNavbar notificationCount={5} />

      <div className="flex">
        <Sidebar role="DOCTOR" />

        <main className="flex-1 pt-20 lg:ml-64">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;