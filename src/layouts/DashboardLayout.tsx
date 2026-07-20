import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import MobileDrawer from "@/components/layout/MobileDrawer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div
      className="
        flex
        h-screen
        overflow-hidden
        bg-background
      "
    >
      {/* ========================= */}
      {/* Desktop Sidebar */}
      {/* ========================= */}

      <aside
        className="
          hidden
          lg:block
          w-72
          shrink-0
          h-screen
        "
      >
        <Sidebar />
      </aside>

      {/* ========================= */}
      {/* Main */}
      {/* ========================= */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          h-screen
        "
      >
        {/* Sticky Navbar */}

        <div className="sticky top-0 z-40">
          <Navbar
            onMenuClick={() =>
              setIsDrawerOpen(true)
            }
          />
        </div>

        {/* Mobile Drawer */}

        <MobileDrawer
          open={isDrawerOpen}
          onClose={() =>
            setIsDrawerOpen(false)
          }
        />

        {/* ========================= */}
        {/* Dashboard Content */}
        {/* ========================= */}

        <main
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden

            bg-background

            px-4
            py-4

            sm:px-6

            lg:px-8
            lg:py-5

            xl:px-10

            pb-24
            lg:pb-6
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1700px]
            "
          >
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}

      <MobileBottomNav hidden={isDrawerOpen}/>
    </div>
  );
};

export default DashboardLayout;