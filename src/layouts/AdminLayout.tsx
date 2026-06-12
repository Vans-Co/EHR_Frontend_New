import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar/Navbar";
import Sidebar from "../components/common/Sidebar/Sidebar";

const AdminLayout = () => {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar role="admin" />

        <main style={{ padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;