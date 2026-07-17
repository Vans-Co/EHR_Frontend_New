import AppButton from "@/components/common/AppButton";

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

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
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

      {/* Date of Birth */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Date of Birth
        </label>

        <input
          type="date"
          value={formData.dob}
          onChange={(e) =>
            updateField("dob", e.target.value)
          }
          className="h-14 w-full rounded-2xl border border-outline-variant px-4 focus:border-primary focus:outline-none"
        />

      </div>

      {/* Gender */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Gender
        </label>

        <select
          value={formData.gender}
          onChange={(e) =>
            updateField(
              "gender",
              e.target.value
            )
          }
          className="h-14 w-full rounded-2xl border border-outline-variant px-4 focus:border-primary focus:outline-none"
        >
          <option value="">
            Select Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Other">
            Other
          </option>

        </select>

      </div>

      {/* Blood Group */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Blood Group
        </label>

        <select
          value={formData.bloodGroup}
          onChange={(e) =>
            updateField(
              "bloodGroup",
              e.target.value
            )
          }
          className="h-14 w-full rounded-2xl border border-outline-variant px-4 focus:border-primary focus:outline-none"
        >
          <option value="">
            Select Blood Group
          </option>

          {bloodGroups.map((group) => (
            <option
              key={group}
              value={group}
            >
              {group}
            </option>
          ))}

        </select>

      </div>

      {/* Phone */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Phone Number
        </label>

        <input
          type="tel"
          placeholder="+91 9876543210"
          value={formData.phoneNo}
          onChange={(e) =>
            updateField(
              "phoneNo",
              e.target.value
            )
          }
          className="h-14 w-full rounded-2xl border border-outline-variant px-4 focus:border-primary focus:outline-none"
        />

      </div>

      {/* Buttons */}

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
          className="flex-1 bg-primary text-white"
          onClick={onNext}
        >
          Continue
        </AppButton>

      </div>

    </div>
  );
};

export default PersonalInfoStep;