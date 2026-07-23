import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";

interface RegisterSuccessProps {
  email: string;
}

const RegisterSuccess = ({ email }: RegisterSuccessProps) => {
  return (
    <div className="text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MailCheck size={32} />
      </div>

      <h2 className="text-xl font-semibold text-on-background">
        Verify your email
      </h2>

      <p className="mt-3 text-sm leading-6 text-on-surface-variant">
        We&apos;ve sent a verification link to{" "}
        <span className="font-semibold text-on-background">{email}</span>.
        Please open it to activate your account before signing in.
      </p>

      <p className="mt-2 text-xs text-on-surface-variant">
        The link expires in 15 minutes. Check your spam folder if it
        doesn&apos;t arrive shortly.
      </p>

      <Link
        to="/login"
        className="mt-8 inline-block w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
      >
        Go to Sign In
      </Link>
    </div>
  );
};

export default RegisterSuccess;
