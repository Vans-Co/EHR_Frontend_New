import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../features/auth/pages/Login";

import PatientDashboard from "../features/patient/PatientDashboard";
import DoctorDashboard from "../features/doctor/DoctorDashboard";
import AdminDashboard from "../features/admin/AdminDashboard";

import AuthLayout from "../layouts/AuthLayout";
import PatientLayout from "../layouts/PatientLayout";
import DoctorLayout from "../layouts/DoctorLayout";
import AdminLayout from "../layouts/AdminLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<PatientLayout />}>
        <Route
          path="/patient/dashboard"
          element={<PatientDashboard />}
        />
      </Route>

      <Route element={<DoctorLayout />}>
        <Route
          path="/doctor/dashboard"
          element={<DoctorDashboard />}
        />
      </Route>

      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
      </Route>

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;