import { Mail, Lock, User } from "lucide-react";

import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";

interface BasicInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  updateField: (
    field: string,
    value: string
  ) => void;

  onNext: () => void;
}

const BasicInfoStep = ({
  formData,
  updateField,
  onNext,
}: BasicInfoStepProps) => {
  return (
    <div className="space-y-6">

      <div>

        <h3 className="text-2xl font-bold text-slate-900">
          Create Your Account
        </h3>

        <p className="mt-2 text-slate-500">
          Let's start with your basic details.
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <AppInput
          label="First Name"
          required
          placeholder="John"
          value={formData.firstName}
          leftIcon={<User size={18} />}
          onChange={(e) =>
            updateField(
              "firstName",
              e.target.value
            )
          }
        />

        <AppInput
          label="Last Name"
          required
          placeholder="Doe"
          value={formData.lastName}
          leftIcon={<User size={18} />}
          onChange={(e) =>
            updateField(
              "lastName",
              e.target.value
            )
          }
        />

      </div>

      <AppInput
        label="Email Address"
        required
        type="email"
        placeholder="john@email.com"
        value={formData.email}
        leftIcon={<Mail size={18} />}
        onChange={(e) =>
          updateField(
            "email",
            e.target.value
          )
        }
      />

      <AppInput
        label="Password"
        required
        type="password"
        placeholder="Enter password"
        value={formData.password}
        leftIcon={<Lock size={18} />}
        onChange={(e) =>
          updateField(
            "password",
            e.target.value
          )
        }
      />

      <AppInput
        label="Confirm Password"
        required
        type="password"
        placeholder="Re-enter password"
        value={formData.confirmPassword}
        leftIcon={<Lock size={18} />}
        onChange={(e) =>
          updateField(
            "confirmPassword",
            e.target.value
          )
        }
      />

      <AppButton
        type="button"
        onClick={onNext}
        className="w-full bg-primary text-white hover:bg-primary/90"
      >
        Continue
      </AppButton>

    </div>
  );
};

export default BasicInfoStep;