import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "../services/authApi";

const LoginForm = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      login(response.user, response.accessToken, response.refreshToken);

      switch (response.user.role) {
        case "ADMIN":
          navigate("/admin/dashboard");
          break;

        case "DOCTOR":
          navigate("/doctor/dashboard");
          break;

      // await new Promise((resolve) =>
      //   setTimeout(resolve, 1500)
      // );
    await loginUser({ email, password });
      
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded border border-outline-variant bg-surface-container-lowest shadow-xl shadow-slate-900/5">
      <div className="border-b border-outline-variant px-6 py-6 sm:px-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
              Secure Login
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-on-background">
              Welcome back
            </h1>
            <p className="mt-2 max-w-sm text-sm leading-6 text-on-surface-variant">
              Sign in to your Vans Healthcare workspace.
            </p>
          </div>

          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded bg-secondary/10 text-secondary sm:flex">
            <ShieldCheck size={21} />
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8">
        {error && (
          <div className="flex items-start gap-3 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <label className="block space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-outline">
            Email Address
          </span>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <Input
              type="email"
              placeholder="name@healthcare.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 pl-10"
            />
          </div>
        </label>

        <label className="block space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-outline">
            Password
          </span>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 px-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition hover:text-on-surface"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-on-surface-variant">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-outline-variant text-secondary focus:ring-secondary"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-primary transition hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded bg-primary text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/15 hover:bg-primary/90"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <div className="rounded border border-outline-variant bg-surface-container-low p-4 text-sm leading-6 text-on-surface-variant">
          Access is protected by role-based authentication for admins, doctors,
          and patients.
        </div>
      </form>

      <div className="border-t border-outline-variant px-6 py-5 text-center sm:px-8">
        <p className="text-sm text-on-surface-variant">
          New to Vans Healthcare?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
