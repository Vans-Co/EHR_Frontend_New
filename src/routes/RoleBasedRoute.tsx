import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface RoleBasedRouteProps {
  allowedRoles: string[];
}

const RoleBasedRoute = ({
  allowedRoles,
}: RoleBasedRouteProps) => {
  const { role } = useAuthStore();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default RoleBasedRoute;