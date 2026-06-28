import { loginUser } from "@/features/auth/services/authApi";

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
