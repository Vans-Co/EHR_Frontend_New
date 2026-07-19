import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="w-full max-w-md rounded border border-outline-variant bg-surface-container-lowest p-6 shadow-xl shadow-slate-900/5 sm:p-8">
      <Link
        to="/login"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft size={16} />
        Back to login
      </Link>

      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
        Password Reset
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-on-background">
        Create new password
      </h1>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">
        Choose a strong password for your Vans Healthcare account.
      </p>

      {submitted ? (
        <div className="mt-6 rounded border border-secondary/30 bg-secondary/10 p-4 text-sm leading-6 text-on-surface">
          Your password reset request is ready to submit once the backend reset
          endpoint is connected.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          {error && (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <PasswordInput
            label="New Password"
            value={password}
            show={showPassword}
            onToggle={() => setShowPassword((current) => !current)}
            onChange={setPassword}
          />
          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            show={showPassword}
            onToggle={() => setShowPassword((current) => !current)}
            onChange={setConfirmPassword}
          />

          <Button type="submit" className="h-11 w-full rounded">
            Save Password
          </Button>
        </form>
      )}
    </div>
  );
};

type PasswordInputProps = {
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
};

const PasswordInput = ({
  label,
  value,
  show,
  onToggle,
  onChange,
}: PasswordInputProps) => (
  <label className="block space-y-1.5">
    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-outline">
      {label}
    </span>
    <div className="relative">
      <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
      <Input
        type={show ? "text" : "password"}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter password"
        className="h-11 px-10"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </label>
);

export default ResetPasswordForm;
