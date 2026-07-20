import { Phone, User, Users } from "lucide-react";

import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";

interface EmergencyContactStepProps {
  formData: {
    contactName: string;
    relationship: string;
    contactPhoneNo: string;
  };

  updateField: (
    field: string,
    value: string
  ) => void;

  onBack: () => void;

  onSubmit: () => void;

  loading?: boolean;
}

const EmergencyContactStep = ({
  formData,
  updateField,
  onBack,
  onSubmit,
  loading = false,
}: EmergencyContactStepProps) => {
  return (
    <div className="space-y-6">

      <div>

        <h3 className="text-2xl font-bold text-slate-900">
          Emergency Contact
        </h3>

        <p className="mt-2 text-slate-500">
          Add someone we can contact during an emergency.
        </p>

      </div>

      <AppInput
        label="Contact Name"
        required
        placeholder="John Doe"
        value={formData.contactName}
        leftIcon={<User size={18} />}
        onChange={(e) =>
          updateField(
            "contactName",
            e.target.value
          )
        }
      />

      <AppInput
        label="Relationship"
        required
        placeholder="Father / Mother / Spouse"
        value={formData.relationship}
        leftIcon={<Users size={18} />}
        onChange={(e) =>
          updateField(
            "relationship",
            e.target.value
          )
        }
      />

      <AppInput
        label="Phone Number"
        required
        placeholder="9876543210"
        value={formData.contactPhoneNo}
        inputMode="numeric"
        maxLength={10}
        helperText="Enter exactly 10 digits."
        leftIcon={<Phone size={18} />}
        onChange={(e) =>
          updateField(
            "contactPhoneNo",
            e.target.value
              .replace(/\D/g, "")
              .slice(0, 10)
          )
        }
      />

      <div className="flex gap-4">

        <AppButton
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onBack}
        >
          Back
        </AppButton>

        <AppButton
          type="button"
          loading={loading}
          className="flex-1 bg-primary text-white"
          onClick={onSubmit}
        >
          Register
        </AppButton>

      </div>

    </div>
  );
};

export default EmergencyContactStep;
