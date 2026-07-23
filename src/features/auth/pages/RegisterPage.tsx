import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "@/components/common/AuthLayout";

import RegisterStepper from "../components/register/RegisterStepper";
import BasicInfoStep from "../components/register/BasicInfoStep";
import PersonalInfoStep from "../components/register/PersonalInfoStep";
import AddressStep from "../components/register/AddressStep";
import EmergencyContactStep from "../components/register/EmergencyContactStep";
import RegisterSuccess from "../components/register/RegisterSuccess";

import { registerUser } from "../services/authApi";
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
  validatePinCode,
  validateRequired,
} from "@/utils/validators";

const Register = () => {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [registered, setRegistered] = useState(false);

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

    const fail = (message: string) => {
      setError(message);
      return false;
    };

    switch (step) {
      case 1: {
        const firstNameError = validateName(
          formData.firstName,
          "First name"
        );
        if (firstNameError) return fail(firstNameError);

        const lastNameError = validateName(
          formData.lastName,
          "Last name"
        );
        if (lastNameError) return fail(lastNameError);

        const emailError = validateEmail(formData.email);
        if (emailError) return fail(emailError);

        const passwordError = validatePassword(formData.password);
        if (passwordError) return fail(passwordError);

        if (formData.password !== formData.confirmPassword) {
          return fail("Passwords do not match.");
        }

        return true;
      }

      case 2: {
        if (!formData.dob) return fail("Date of birth is required.");
        if (new Date(formData.dob) > new Date()) {
          return fail("Date of birth cannot be in the future.");
        }
        if (!formData.gender) return fail("Please select a gender.");
        if (!formData.bloodGroup)
          return fail("Please select a blood group.");

        const phoneError = validatePhone(formData.phoneNo);
        if (phoneError) return fail(phoneError);

        return true;
      }

      case 3: {
        const addressError = validateRequired(
          formData.addressLine,
          "Address"
        );
        if (addressError) return fail(addressError);

        const cityError = validateRequired(formData.city, "City");
        if (cityError) return fail(cityError);

        const stateError = validateRequired(formData.state, "State");
        if (stateError) return fail(stateError);

        const pinError = validatePinCode(formData.pinCode);
        if (pinError) return fail(pinError);

        return true;
      }

      case 4: {
        const nameError = validateName(
          formData.contactName,
          "Contact name"
        );
        if (nameError) return fail(nameError);

        const relationshipError = validateRequired(
          formData.relationship,
          "Relationship"
        );
        if (relationshipError) return fail(relationshipError);

        const contactPhoneError = validatePhone(
          formData.contactPhoneNo,
          "Contact phone"
        );
        if (contactPhoneError) return fail(contactPhoneError);

        return true;
      }

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

      setRegistered(true);
    } catch {
      setError(
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <AuthLayout
        title="Almost there"
        subtitle="One last step to secure your account."
      >
        <RegisterSuccess email={formData.email} />
      </AuthLayout>
    );
  }

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
