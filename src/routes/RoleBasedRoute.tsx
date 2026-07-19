import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface RoleBasedRouteProps {
  children: React.ReactNode;
}

const RoleBasedRoute = ({
  children,
}: RoleBasedRouteProps) => {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const role = useAuthStore(
    (state) => state.role
  );

  if (isAuthenticated) {
    switch (role) {
      case "ADMIN":
        return (
          <Navigate
            to="/admin/dashboard"
            replace
          />
        );

      case "DOCTOR":
        return (
          <Navigate
            to="/doctor/dashboard"
            replace
          />
        );

      case "PATIENT":
        return (
          <Navigate
            to="/patient/dashboard"
            replace
          />
        );

      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default RoleBasedRoute;