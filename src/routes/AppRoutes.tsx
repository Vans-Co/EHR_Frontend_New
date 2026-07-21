import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "@/pages/HomePage";

import LoginPage from "@/features/auth/pages/Login";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPassword";
import ResetPasswordPage from "@/features/auth/pages/ResetPassword";

import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import DoctorDashboard from "@/features/doctor/pages/DoctorDashboard";
import DoctorAvailability from "@/features/doctor/pages/DoctorAvailability";
import DoctorAppointments from "@/features/doctor/pages/DoctorAppointments";
import DoctorPatients from "@/features/doctor/pages/DoctorPatients";
import DoctorProfile from "@/features/doctor/pages/DoctorProfile";
import PatientPermissions from "@/features/patient/pages/PatientPermissions";
import PatientAllergies from "@/features/patient/pages/PatientAllergies";
import PatientDashboard from "@/features/patient/pages/PatientDashboard";
//import PatientMedication from "@/features/patient/pages/PatientMedication";
import PatientBilling from "@/features/patient/pages/PatientBilling";
import PatientBillingDue from "@/features/patient/pages/PatientBillingDue";
import PatientBillingHistory from "@/features/patient/pages/PatientBillingHistory";
import PatientBillingInvoiceDetails from "@/features/patient/pages/PatientBillingInvoiceDetails";
import PatientBillingRecurring from "@/features/patient/pages/PatientBillingRecurring";
import PatientProfile from "@/features/patient/pages/PatientProfile";
import PatientProfileEdit from "@/features/patient/pages/PatientProfileEdit";

import AdminLayout from "@/layouts/AdminLayout";
import DoctorLayout from "@/layouts/DoctorLayout";
import PatientLayout from "@/layouts/PatientLayout";

import ProtectedRoute from "@/routes/ProtectedRoute";
import RoleBasedRoute from "@/routes/RoleBasedRoute";
import PatientAppointments from "@/features/patient/pages/PatientAppointments";
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
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<PatientDashboard />} />
        {<Route path="appointments" element={<PatientAppointments />} />}

        <Route path="profile" element={<PatientProfile />} />

        <Route path="profile/edit" element={<PatientProfileEdit />} />

        <Route path="billing" element={<PatientBilling />} />

        <Route
          path="billing/invoices/:id"
          element={<PatientBillingInvoiceDetails />}
        />

        <Route path="billing/due" element={<PatientBillingDue />} />

        <Route path="billing/history" element={<PatientBillingHistory />} />

        <Route path="billing/recurring" element={<PatientBillingRecurring />} />

        <Route path="allergies" element={<PatientAllergies />} />

        <Route path="permissions" element={<PatientPermissions />} />
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
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<DoctorDashboard />} />

        <Route path="availability" element={<DoctorAvailability />} />

        <Route path="appointments" element={<DoctorAppointments />} />

        <Route path="patients" element={<DoctorPatients />} />

        <Route path="profile" element={<DoctorProfile />} />
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
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* ========================= */}
      {/* 404 */}
      {/* ========================= */}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
