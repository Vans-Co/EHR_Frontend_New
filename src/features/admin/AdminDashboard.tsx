import api from "../../config/axios";
import { useAuthStore } from "../../store/authStore";
import { loginUser } from "../auth/services/authApi";

console.log(loginUser);

const AdminDashboard = () => {
  const { login } = useAuthStore();

  const testAxios = async () => {
    login(
      {
        id: "1",
        firstName: "Prerit",
        lastName: "Kumar",
        email: "test@gmail.com",
        role: "ADMIN",
      },
      {
        accessToken: "abc123",
        refreshToken: "xyz456",
        expiresIn: 3600,
      }
    );

    console.log(
      "Current Token:",
      useAuthStore.getState().accessToken
    );

    console.log(
      "Axios Base URL:",
      api.defaults.baseURL
    );
  };

  return (
    <button onClick={testAxios}>
      Test Axios
    </button>
  );
};

export default AdminDashboard;
