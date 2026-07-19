export type AllergyType =
  | "FOOD"
  | "DRUG"
  | "ENVIRONMENTAL"
  | "INSECT"
  | "OTHER";

export type AllergySeverity =
  | "MILD"
  | "MODERATE"
  | "SEVERE"
  | "LIFE_THREATENING";

export interface PatientAllergy {
  allergyId: string;
  patientId: string;
  category: string;
  allergyItem: string;
  allergyType: AllergyType;
  severity: AllergySeverity;
  description: string;
}

export interface AllergyFormValues {
  allergyId?: string;
  category: string;
  allergyItem: string;
  allergyType: AllergyType;
  severity: AllergySeverity;
  description: string;
}

export interface AllergyFormErrors {
  category?: string;
  allergyItem?: string;
  allergyType?: string;
  severity?: string;
  description?: string;
}
