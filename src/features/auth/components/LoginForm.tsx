import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
  User,
  Stethoscope,
  ShieldCheck,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";

import { loginUser } from "@/features/auth/services/authApi";
import { useAuthStore } from "@/store/authStore";

import type { UserRole } from "../types/auth.types";

const LoginForm = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [role, setRole] =
    useState<UserRole>("PATIENT");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      const user =
        response.loginResponse.userResponseDTO;

      // The selected role tab must match the account's actual role, so a
      // patient account cannot sign in through the Doctor/Admin tab and vice versa.
      if (user.role !== role) {
        setError(
          `This account is not registered as a ${role.toLowerCase()}. Please select the correct role.`
        );
        return;
      }

      const accessToken =
        response.tokenResponse.accessToken;

      const refreshToken =
        response.tokenResponse.refreshToken;

      login(
        user,
        accessToken,
        refreshToken
      );

      switch (user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "DOCTOR":
          navigate("/doctor/dashboard");
          break;

        case "PATIENT":
          navigate("/patient/dashboard");
          break;

        default:
          navigate("/");
      }
    } catch {
      setError(
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Role */}

      <div>

        <label className="mb-3 block text-sm font-semibold text-slate-700">

          Login As

        </label>

        <div className="grid grid-cols-3 gap-3">

          <button
            type="button"
            onClick={() =>
              setRole("PATIENT")
            }
            className={`rounded-2xl border p-4 transition ${
              role === "PATIENT"
                ? "border-primary bg-primary text-white"
                : "bg-white hover:bg-slate-50"
            }`}
          >
            <User className="mx-auto mb-2" />

            <p className="text-sm font-semibold">

              Patient

            </p>

          </button>

          <button
            type="button"
            onClick={() =>
              setRole("DOCTOR")
            }
            className={`rounded-2xl border p-4 transition ${
              role === "DOCTOR"
                ? "border-primary bg-primary text-white"
                : "bg-white hover:bg-slate-50"
            }`}
          >
            <Stethoscope className="mx-auto mb-2" />

            <p className="text-sm font-semibold">

              Doctor

            </p>

          </button>

          <button
            type="button"
            onClick={() =>
              setRole("ADMIN")
            }
            className={`rounded-2xl border p-4 transition ${
              role === "ADMIN"
                ? "border-primary bg-primary text-white"
                : "bg-white hover:bg-slate-50"
            }`}
          >
            <ShieldCheck className="mx-auto mb-2" />

            <p className="text-sm font-semibold">

              Admin

            </p>

          </button>

        </div>

      </div>

      {error && (

        <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">

          <AlertCircle size={18} />

          <span className="text-sm">

            {error}

          </span>

        </div>

      )}

      <AppInput
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        leftIcon={<Mail size={18} />}
      />

      <AppInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        leftIcon={<Lock size={18} />}
      />

      <div className="flex items-center justify-between">

        <label className="flex items-center gap-2 text-sm text-slate-600">

          <input type="checkbox" />

          Remember Me

        </label>

        <Link
          to="/forgot-password"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Forgot Password?
        </Link>

      </div>

      <AppButton
        loading={loading}
        type="submit"
        className="w-full bg-primary text-white hover:bg-primary/90"
      >
        {!loading && (
          <>
            Sign In

            <ArrowRight
              className="ml-2"
              size={18}
            />
          </>
        )}
      </AppButton>

      <div className="rounded-2xl bg-slate-50 p-4 text-center text-sm text-slate-600">

        {role === "PATIENT" ? (
          <>
            New Patient?{" "}

            <Link
              to="/register"
              className="font-semibold text-primary hover:underline"
            >
              Create Patient Account
            </Link>
          </>
        ) : (
          <>
            {role === "DOCTOR"
              ? "Doctor accounts are created by the Administrator."
              : "Administrator accounts are managed by the System Administrator."}
          </>
        )}

      </div>

    </form>
  );
};

export default LoginForm;
