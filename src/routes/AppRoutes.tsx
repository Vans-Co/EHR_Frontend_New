import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/HomePage";

import LoginPage from "@/features/auth/pages/Login";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";
import ResetPasswordPage from "@/features/auth/pages/ResetPassword";

import AdminDashboard from "@/features/admin/AdminDashboard";
import DoctorDashboard from "@/features/doctor/DoctorDashboard";
import PatientDashboard from "@/features/patient/PatientDashboard";

import ProtectedRoute from "@/routes/ProtectedRoute";
import RoleBasedRoute from "@/routes/RoleBasedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={
          <RoleBasedRoute>
            <LoginPage />
          </RoleBasedRoute>
        }
      />

      <Route
        path="/register"
        element={
          <RoleBasedRoute>
            <RegisterPage />
          </RoleBasedRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <RoleBasedRoute>
            <ForgotPasswordPage />
          </RoleBasedRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <RoleBasedRoute>
            <ResetPasswordPage />
          </RoleBasedRoute>
        }
      />

      {/* Admin Routes */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN"]}
          >
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}

      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["DOCTOR"]}
          >
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      {/* Patient Routes */}

      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["PATIENT"]}
          >
            <PatientDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}

      <Route
        path="*"
        element={
          <Navigate to="/" replace />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
