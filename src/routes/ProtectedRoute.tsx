import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { UserRole } from "../features/auth/types/auth.types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const role = useAuthStore(
    (state) => state.role
  );


   // Original authentication
// git status;
 
   // // Temporary for frontend development without backend
  //  if (!isAuthenticated) {
  //    return <>{children}</>;
  // }

  if (
    allowedRoles &&
    role !== null &&
    !allowedRoles.includes(role)
  ) {
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

export default ProtectedRoute;
