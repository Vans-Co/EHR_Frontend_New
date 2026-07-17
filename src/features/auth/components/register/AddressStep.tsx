import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";

import {
  Home,
  MapPin,
  Building2,
  Hash,
} from "lucide-react";

interface AddressStepProps {
  formData: {
    addressLine: string;
    city: string;
    state: string;
    pinCode: string;
  };

  updateField: (
    field: string,
    value: string
  ) => void;

  onNext: () => void;

  onBack: () => void;
}

const AddressStep = ({
  formData,
  updateField,
  onNext,
  onBack,
}: AddressStepProps) => {
  return (
    <div className="space-y-6">

      <div>

        <h3 className="text-2xl font-bold text-slate-900">
          Address Details
        </h3>

        <p className="mt-2 text-slate-500">
          Tell us where you live.
        </p>

      </div>

      <AppInput
        label="Address"
        required
        placeholder="Street, Area, House No."
        value={formData.addressLine}
        leftIcon={<Home size={18} />}
        onChange={(e) =>
          updateField(
            "addressLine",
            e.target.value
          )
        }
      />

      <div className="grid gap-5 md:grid-cols-2">

        <AppInput
          label="City"
          required
          placeholder="Ahmedabad"
          value={formData.city}
          leftIcon={<Building2 size={18} />}
          onChange={(e) =>
            updateField(
              "city",
              e.target.value
            )
          }
        />

        <AppInput
          label="State"
          required
          placeholder="Gujarat"
          value={formData.state}
          leftIcon={<MapPin size={18} />}
          onChange={(e) =>
            updateField(
              "state",
              e.target.value
            )
          }
        />

      </div>

      <AppInput
        label="PIN Code"
        required
        placeholder="380001"
        value={formData.pinCode}
        leftIcon={<Hash size={18} />}
        onChange={(e) =>
          updateField(
            "pinCode",
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
          className="flex-1 bg-primary text-white"
          onClick={onNext}
        >
          Continue
        </AppButton>

      </div>

    </div>
  );
};

export default AddressStep;