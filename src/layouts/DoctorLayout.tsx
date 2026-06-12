import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar/Navbar";
import Sidebar from "../components/common/Sidebar/Sidebar";

const DoctorLayout = () => {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar role="doctor" />

        <main style={{ padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DoctorLayout;