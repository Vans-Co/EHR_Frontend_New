import api from "@/config/axios";

import type {
  AllergyFormValues,
  PatientAllergy,
} from "@/features/patient/types/allergy.types";

const normalizeAllergyType = (
  value: unknown
): PatientAllergy["allergyType"] => {
  const normalized = String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_");

  switch (normalized) {
    case "FOOD":
    case "DRUG":
    case "ENVIRONMENTAL":
    case "INSECT":
      return normalized;
    default:
      return "OTHER";
  }
};

const normalizeSeverity = (
  value: unknown
): PatientAllergy["severity"] => {
  const normalized = String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "_");

  switch (normalized) {
    case "MILD":
    case "MODERATE":
    case "SEVERE":
    case "LIFE_THREATENING":
      return normalized;
    default:
      return "MODERATE";
  }
};

const normalizeAllergy = (
  patientId: string,
  raw: unknown
): PatientAllergy | null => {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const record = raw as Record<string, unknown>;
  const allergyId =
    String(
      record.allergyId ??
        record.allergyid ??
        record.id ??
        record.allergy_id ??
        ""
    ).trim();

  if (!allergyId) {
    return null;
  }

  const category = String(
    record.category ?? ""
  ).trim();
  const allergyItem = String(
    record.allergyItem ??
      record.allergyitem ??
      record.items ??
      record.item ??
      record.name ??
      category ??
      ""
  ).trim();
  const description = String(
    record.description ?? ""
  ).trim();

  return {
    allergyId,
    patientId:
      String(record.patientId ?? record.patientid ?? patientId).trim() ||
      patientId,
    category,
    allergyItem: allergyItem || category,
    allergyType: normalizeAllergyType(
      record.allergyType ?? record.allergytype ?? record.type
    ),
    severity: normalizeSeverity(record.severity),
    description,
  };
};

const toPayload = (
  patientId: string,
  values: AllergyFormValues
) => ({
  allergyId: values.allergyId,
  patientId,
  category: values.category.trim(),
  allergyItem: values.allergyItem.trim(),
  allergyType: values.allergyType,
  severity: values.severity,
  description: values.description.trim(),
});

/**
 * Fetch all allergies for a patient.
 * GET /patients/{patientId}/allergies
 */
export const getPatientAllergies = async (
  patientId: string
): Promise<PatientAllergy[]> => {
  const response = await api.get(
    `/patients/${patientId}/allergies`
  );

  const rawData = Array.isArray(response.data)
    ? response.data
    : Array.isArray(response.data?.data)
      ? response.data.data
      : Array.isArray(response.data?.allergies)
        ? response.data.allergies
        : [];

  return (rawData as unknown[])
    .map((item: unknown) =>
      normalizeAllergy(patientId, item)
    )
    .filter(
      (
        item: PatientAllergy | null
      ): item is PatientAllergy => item !== null
    );
};

/**
 * Add a new allergy for a patient.
 * POST /patients/{patientId}/allergies
 */
export const addPatientAllergy = async (
  patientId: string,
  values: AllergyFormValues
): Promise<PatientAllergy> => {
  const payload = toPayload(patientId, values);

  const response = await api.post(
    `/patients/${patientId}/allergies`,
    payload
  );

  const normalized = normalizeAllergy(
    patientId,
    response.data
  );

  return normalized ?? {
    ...payload,
    allergyId: payload.allergyId || "",
  };
};

/**
 * Update an existing allergy for a patient.
 * PUT /patients/{patientId}/allergies
 */
export const updatePatientAllergy = async (
  patientId: string,
  values: AllergyFormValues
): Promise<PatientAllergy> => {
  const payload = toPayload(patientId, values);

  const response = await api.put(
    `/patients/${patientId}/allergies`,
    payload
  );

  const normalized = normalizeAllergy(
    patientId,
    response.data
  );

  return normalized ?? {
    ...payload,
    allergyId: payload.allergyId || "",
  };
};

/**
 * Delete an allergy for a patient.
 * DELETE /patients/{patientId}/allergies/{allergyId}
 */
export const deletePatientAllergy = async (
  patientId: string,
  allergyId: string
): Promise<void> => {
  await api.delete(
    `/patients/${patientId}/allergies/${allergyId}`
  );
};
