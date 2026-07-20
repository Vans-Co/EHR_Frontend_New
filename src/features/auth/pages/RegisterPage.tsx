import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "@/components/common/AuthLayout";

import RegisterStepper from "../components/register/RegisterStepper";
import BasicInfoStep from "../components/register/BasicInfoStep";
import PersonalInfoStep from "../components/register/PersonalInfoStep";
import AddressStep from "../components/register/AddressStep";
import EmergencyContactStep from "../components/register/EmergencyContactStep";

import { registerUser } from "../services/authApi";

const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const tenDigitPattern = /^\d{10}$/;

  const [formData, setFormData] = useState({
    // Basic
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",

    // Personal
    dob: "",
    gender: "",
    bloodGroup: "",
    phoneNo: "",

    // Address
    addressLine: "",
    city: "",
    state: "",
    pinCode: "",

    // Emergency
    contactName: "",
    relationship: "",
    contactPhoneNo: "",
  });

  const updateField = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateStep = () => {
    setError("");

    switch (step) {
      case 1:
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          setError("Please fill all required fields.");
          return false;
        }

        if (
          formData.password !==
          formData.confirmPassword
        ) {
          setError("Passwords do not match.");
          return false;
        }

        return true;

      case 2:
        if (
          !formData.dob ||
          !formData.gender ||
          !formData.bloodGroup ||
          !formData.phoneNo
        ) {
          setError(
            "Please complete all personal details."
          );
          return false;
        }

        if (
          !tenDigitPattern.test(formData.phoneNo)
        ) {
          setError(
            "Phone number must contain exactly 10 digits."
          );
          return false;
        }

        return true;

      case 3:
        if (
          !formData.addressLine ||
          !formData.city ||
          !formData.state ||
          !formData.pinCode
        ) {
          setError(
            "Please complete address details."
          );
          return false;
        }

        return true;

      case 4:
        if (
          !formData.contactName ||
          !formData.relationship ||
          !formData.contactPhoneNo
        ) {
          setError(
            "Please complete emergency contact."
          );
          return false;
        }

        if (
          !tenDigitPattern.test(
            formData.contactPhoneNo
          )
        ) {
          setError(
            "Emergency contact number must contain exactly 10 digits."
          );
          return false;
        }

        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (!validateStep()) return;

    setStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setError("");

    setStep((prev) => prev - 1);
  };

  const bloodGroupToEnum: Record<string, string> = {
    "A+": "A_POSITIVE",
    "A-": "A_NEGATIVE",
    "B+": "B_POSITIVE",
    "B-": "B_NEGATIVE",
    "AB+": "AB_POSITIVE",
    "AB-": "AB_NEGATIVE",
    "O+": "O_POSITIVE",
    "O-": "O_NEGATIVE",
  };

  const toMmDdYyyy = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-");
    return `${month}-${day}-${year}`;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);

    setError("");

    try {
      await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,

        email: formData.email,

        password: formData.password,

        role: "PATIENT",

        dob: toMmDdYyyy(formData.dob),

        gender:
          formData.gender as
            | "Male"
            | "Female"
            | "Other",

        phoneNo: Number(
          formData.phoneNo
        ),

        bloodGroup:
          bloodGroupToEnum[formData.bloodGroup],

        address: {
          addressLine:
            formData.addressLine,

          city: formData.city,

          state: formData.state,

          pin_code: Number(
            formData.pinCode
          ),
        },

        emergencyContact: {
          contactName:
            formData.contactName,

          relationship:
            formData.relationship,

          contactPhoneNo: Number(
            formData.contactPhoneNo
          ),
        },
      });

      navigate("/login");
    } catch {
      setError(
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Patient Account"
      subtitle="Join our secure Electronic Health Record platform."
    >
      <RegisterStepper currentStep={step} />

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {step === 1 && (
        <BasicInfoStep
          formData={{
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            confirmPassword:
              formData.confirmPassword,
          }}
          updateField={updateField}
          onNext={nextStep}
        />
      )}

      {step === 2 && (
        <PersonalInfoStep
          formData={{
            dob: formData.dob,
            gender: formData.gender,
            bloodGroup:
              formData.bloodGroup,
            phoneNo: formData.phoneNo,
          }}
          updateField={updateField}
          onNext={nextStep}
          onBack={previousStep}
        />
      )}

      {step === 3 && (
        <AddressStep
          formData={{
            addressLine:
              formData.addressLine,
            city: formData.city,
            state: formData.state,
            pinCode:
              formData.pinCode,
          }}
          updateField={updateField}
          onNext={nextStep}
          onBack={previousStep}
        />
      )}

      {step === 4 && (
        <EmergencyContactStep
          formData={{
            contactName:
              formData.contactName,
            relationship:
              formData.relationship,
            contactPhoneNo:
              formData.contactPhoneNo,
          }}
          updateField={updateField}
          onBack={previousStep}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}

      <div className="my-8 h-px bg-outline-variant" />

      <div className="text-center">
        <p className="text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
