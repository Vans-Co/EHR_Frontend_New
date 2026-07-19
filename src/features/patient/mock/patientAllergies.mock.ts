import type { PatientAllergy } from "@/features/patient/types/allergy.types";

export const patientAllergiesFallback: PatientAllergy[] = [
  {
    allergyId: "ALG-1001",
    patientId: "PT-20481",
    category: "Food",
    allergyItem: "Peanuts",
    allergyType: "FOOD",
    severity: "SEVERE",
    description: "Causes anaphylaxis and immediate swelling.",
  },
  {
    allergyId: "ALG-1002",
    patientId: "PT-20481",
    category: "Medication",
    allergyItem: "Penicillin",
    allergyType: "DRUG",
    severity: "LIFE_THREATENING",
    description: "History of breathing difficulty after administration.",
  },
  {
    allergyId: "ALG-1003",
    patientId: "PT-20481",
    category: "Environment",
    allergyItem: "Dust mites",
    allergyType: "ENVIRONMENTAL",
    severity: "MODERATE",
    description: "Triggers sinus congestion and sneezing.",
  },
  {
    allergyId: "ALG-1004",
    patientId: "PT-20481",
    category: "Food",
    allergyItem: "Shellfish",
    allergyType: "FOOD",
    severity: "MILD",
    description: "Causes mild skin irritation when consumed.",
  },
];
