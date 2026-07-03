import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/HomePage";

import LoginPage from "@/features/auth/pages/Login";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";
import ResetPasswordPage from "@/features/auth/pages/ResetPassword";

import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import DoctorDashboard from "@/features/doctor/pages/DoctorDashboard";
import PatientDashboard from "@/features/patient/pages/PatientDashboard";

import AdminLayout from "@/layouts/AdminLayout";
import DoctorLayout from "@/layouts/DoctorLayout";
import PatientLayout from "@/layouts/PatientLayout";

import ProtectedRoute from "@/routes/ProtectedRoute";
import RoleBasedRoute from "@/routes/RoleBasedRoute";
import PatientAppointments from "@/features/patient/pages/PatientAppointments";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/" element={<HomePage />} />

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
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Doctor Routes */}

      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={["DOCTOR"]}>
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DoctorDashboard />} />
      </Route>

      {/* Patient Routes */}

      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={["PATIENT"]}>
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="appointments" element={<PatientAppointments />}/>
      </Route>

      {/* Fallback */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;