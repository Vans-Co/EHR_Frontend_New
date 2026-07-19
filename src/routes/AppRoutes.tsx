import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/HomePage";

import LoginPage from "@/features/auth/pages/Login";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";
import ResetPasswordPage from "@/features/auth/pages/ResetPassword";

// Patient Pages
import PatientDashboard from "@/features/patient/pages/PatientDashboard";
import PatientAppointments from "@/features/patient/pages/PatientAppointments";
import PatientMedicalRecords from "@/features/patient/pages/PatientMedicalRecords";
import PatientPrescriptions from "@/features/patient/pages/PatientPrescriptions";
import PatientBilling from "@/features/patient/pages/PatientBilling";
import PatientInsurance from "@/features/patient/pages/PatientInsurance";
import PatientProfile from "@/features/patient/pages/PatientProfile";
import PatientSettings from "@/features/patient/pages/PatientSettings";

// Doctor Pages
import DoctorDashboard from "@/features/doctor/pages/DoctorDashboard";
import DoctorAppointments from "@/features/doctor/pages/DoctorAppointments";
import DoctorPatients from "@/features/doctor/pages/DoctorPatients";
import DoctorMedicalRecords from "@/features/doctor/pages/DoctorMedicalRecords";
import DoctorPrescriptions from "@/features/doctor/pages/DoctorPrescriptions";
import DoctorProfile from "@/features/doctor/pages/DoctorProfile";
import DoctorSettings from "@/features/doctor/pages/DoctorSettings";

// Admin Pages
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AdminUsers from "@/features/admin/pages/AdminUsers";
import AdminDoctors from "@/features/admin/pages/AdminDoctors";
import AdminHospitals from "@/features/admin/pages/AdminHospitals";
import AdminAppointments from "@/features/admin/pages/AdminAppointments";
import AdminBilling from "@/features/admin/pages/AdminBilling";
import AdminSettings from "@/features/admin/pages/AdminSettings";

import AdminLayout from "@/layouts/AdminLayout";
import DoctorLayout from "@/layouts/DoctorLayout";
import PatientLayout from "@/layouts/PatientLayout";

import ProtectedRoute from "@/routes/ProtectedRoute";
import RoleBasedRoute from "@/routes/RoleBasedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ========================= */}
      {/* Public Routes */}
      {/* ========================= */}

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

      {/* ========================= */}
      {/* Patient */}
      {/* ========================= */}

      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={["PATIENT"]}>
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<PatientDashboard />}
        />

        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="medical-records" element={<PatientMedicalRecords />} />
        <Route path="prescriptions" element={<PatientPrescriptions />} />
        <Route path="billing" element={<PatientBilling />} />
        <Route path="insurance" element={<PatientInsurance />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="settings" element={<PatientSettings />} />

      </Route>

      {/* ========================= */}
      {/* Doctor */}
      {/* ========================= */}

      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={["DOCTOR"]}>
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<DoctorDashboard />}
        />

        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="medical-records" element={<DoctorMedicalRecords />} />
        <Route path="prescriptions" element={<DoctorPrescriptions />} />
        <Route path="profile" element={<DoctorProfile />} />
        <Route path="settings" element={<DoctorSettings />} />

      </Route>

      {/* ========================= */}
      {/* Admin */}
      {/* ========================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Navigate to="dashboard" replace />}
        />

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        <Route path="users" element={<AdminUsers />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="hospitals" element={<AdminHospitals />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="billing" element={<AdminBilling />} />
        <Route path="settings" element={<AdminSettings />} />

      </Route>

      {/* ========================= */}
      {/* 404 */}
      {/* ========================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

export default AppRoutes;