import api from "../../config/axios";
import { useAuthStore } from "../../store/authStore";
import { loginUser } from "../auth/services/authApi";

console.log(loginUser);

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Authentication Working ✅</p>
    </div>
  );
};

export default AdminDashboard;
