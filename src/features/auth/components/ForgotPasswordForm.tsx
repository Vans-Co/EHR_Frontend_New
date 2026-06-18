import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
        Account Recovery
      </p>
      <h1 className="mt-2 text-3xl font-semibold text-on-background">
        Reset your password
      </h1>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">
        Enter your registered email address and we will send password reset
        instructions when recovery is enabled.
      </p>

      {submitted ? (
        <div className="mt-6 rounded border border-secondary/30 bg-secondary/10 p-4 text-sm leading-6 text-on-surface">
          If an account exists for <span className="font-semibold">{email}</span>,
          reset instructions will be sent to that address.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-outline">
              Email Address
            </span>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <Input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@healthcare.com"
                className="h-11 pl-10"
              />
            </div>
          </label>

          <Button type="submit" className="h-11 w-full rounded">
            Send Instructions
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
