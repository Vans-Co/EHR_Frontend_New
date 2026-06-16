import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginUser } from "../services/authApi";

const LoginForm = () => {
  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      // loginUser() integration in next step

      // await new Promise((resolve) =>
      //   setTimeout(resolve, 1500)
      // );
    await loginUser({ email, password });
      
    } catch {
      setError(
        "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[480px]">
      <div className="backdrop-blur-xl bg-white/90 border border-slate-200 rounded-3xl shadow-2xl p-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-slate-900 rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
            🏥
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            Vans Healthcare
          </h1>

          <p className="text-slate-600 mt-3 text-lg">
            Enterprise Healthcare Platform
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Email
            </label>

            <Input
              type="email"
              placeholder="name@healthcare.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Password
              </label>

              <button
                type="button"
                className="text-sm text-blue-600"
              >
                Forgot Password?
              </button>
            </div>

            <div className="relative">
              <Input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />

            <label
              htmlFor="remember"
              className="text-sm text-slate-600"
            >
              Remember Me
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-full"
          >
            {loading ? (
              "Authenticating..."
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-sm text-slate-500">
            Need access?
            <span className="text-blue-600 font-semibold ml-1">
              Contact Administrator
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-slate-400">
        🔒 Enterprise Secure Authentication Platform
      </div>
    </div>
  );
};

export default LoginForm;
