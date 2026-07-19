import {
  Droplets,
  Phone,
  UserRound,
} from "lucide-react";

import AppButton from "@/components/common/AppButton";
import AppDatePicker from "@/components/common/AppDatePicker";
import AppInput from "@/components/common/AppInput";
import AppSelect from "@/components/common/AppSelect";

interface PersonalInfoStepProps {
  formData: {
    dob: string;
    gender: string;
    bloodGroup: string;
    phoneNo: string;
  };

  updateField: (
    field: string,
    value: string
  ) => void;

  onNext: () => void;

  onBack: () => void;
}

const genderOptions = [
  {
    label: "Select Gender",
    value: "",
  },
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Other",
    value: "Other",
  },
];

const bloodGroupOptions = [
  {
    label: "Select Blood Group",
    value: "",
  },
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
];

const PersonalInfoStep = ({
  formData,
  updateField,
  onNext,
  onBack,
}: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6">

      <div>

        <h3 className="text-2xl font-bold text-slate-900">
          Personal Information
        </h3>

        <p className="mt-2 text-slate-500">
          Tell us a little more about yourself.
        </p>

      </div>

      <AppDatePicker
        label="Date of Birth"
        required
        value={formData.dob}
        onChange={(e) =>
          updateField(
            "dob",
            e.target.value
          )
        }
      />

      <AppSelect
        label="Gender"
        required
        options={genderOptions}
        value={formData.gender}
        leftIcon={<UserRound size={18} />}
        onChange={(e) =>
          updateField(
            "gender",
            e.target.value
          )
        }
      />

      <AppSelect
        label="Blood Group"
        required
        options={bloodGroupOptions}
        value={formData.bloodGroup}
        leftIcon={<Droplets size={18} />}
        onChange={(e) =>
          updateField(
            "bloodGroup",
            e.target.value
          )
        }
      />

      <AppInput
        label="Phone Number"
        required
        placeholder="+91 9876543210"
        value={formData.phoneNo}
        leftIcon={<Phone size={18} />}
        onChange={(e) =>
          updateField(
            "phoneNo",
            e.target.value
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
          className="flex-1 bg-primary text-white hover:bg-primary/90"
          onClick={onNext}
        >
          Continue
        </AppButton>

      </div>

    </div>
  );
};

export default PersonalInfoStep;