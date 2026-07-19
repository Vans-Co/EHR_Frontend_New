import api from "@/config/axios";
import { patientAllergiesFallback } from "@/features/patient/mock/patientAllergies.mock";

import type {
  AllergyFormValues,
  PatientAllergy,
} from "@/features/patient/types/allergy.types";

const getStorageKey = (patientId: string) =>
  `patientAllergies:${patientId}`;

const createFallbackId = () =>
  `ALG-${Date.now().toString().slice(-6)}`;

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
        record.id ??
        record.allergy_id ??
        ""
    ).trim() || createFallbackId();

  const category = String(
    record.category ?? ""
  ).trim();
  const allergyItem = String(
    record.allergyItem ??
      record.item ??
      record.name ??
      ""
  ).trim();
  const description = String(
    record.description ?? ""
  ).trim();

  if (!category || !allergyItem) {
    return null;
  }

  return {
    allergyId,
    patientId:
      String(record.patientId ?? patientId).trim() ||
      patientId,
    category,
    allergyItem,
    allergyType: normalizeAllergyType(
      record.allergyType ?? record.type
    ),
    severity: normalizeSeverity(record.severity),
    description,
  };
};

const readFallbackAllergies = (
  patientId: string
): PatientAllergy[] => {
  const stored = localStorage.getItem(
    getStorageKey(patientId)
  );

  if (stored) {
    try {
      const parsed = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        return parsed
          .map((item) =>
            normalizeAllergy(patientId, item)
          )
          .filter(
            (item): item is PatientAllergy =>
              item !== null
          );
      }
    } catch (error) {
      console.warn(
        "Failed to parse local allergy data. Resetting fallback data.",
        error
      );
    }
  }

  const seededData = patientAllergiesFallback
    .filter((item) => item.patientId === patientId)
    .map((item) => ({ ...item }));

  localStorage.setItem(
    getStorageKey(patientId),
    JSON.stringify(seededData)
  );

  return seededData;
};

const writeFallbackAllergies = (
  patientId: string,
  allergies: PatientAllergy[]
) => {
  localStorage.setItem(
    getStorageKey(patientId),
    JSON.stringify(allergies)
  );
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

export const getPatientAllergies = async (
  patientId: string
): Promise<PatientAllergy[]> => {
  try {
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
  } catch (error) {
    console.warn(
      "Using fallback allergy data because the backend request failed.",
      error
    );

    return readFallbackAllergies(patientId);
  }
};

export const addPatientAllergy = async (
  patientId: string,
  values: AllergyFormValues
): Promise<PatientAllergy> => {
  const payload = toPayload(patientId, values);

  try {
    const response = await api.post(
      `/patients/${patientId}/allergies`,
      payload
    );

    return (
      normalizeAllergy(patientId, response.data) ?? {
        ...payload,
        allergyId: payload.allergyId || createFallbackId(),
      }
    );
  } catch (error) {
    console.warn(
      "Saving allergy to fallback storage because the backend create failed.",
      error
    );

    const allergies = readFallbackAllergies(patientId);
    const created: PatientAllergy = {
      ...payload,
      allergyId: createFallbackId(),
    };

    writeFallbackAllergies(patientId, [
      created,
      ...allergies,
    ]);

    return created;
  }
};

export const updatePatientAllergy = async (
  patientId: string,
  values: AllergyFormValues
): Promise<PatientAllergy> => {
  const payload = toPayload(patientId, values);

  try {
    const response = await api.put(
      `/patients/${patientId}/allergies`,
      payload
    );

    return (
      normalizeAllergy(patientId, response.data) ?? {
        ...payload,
        allergyId: payload.allergyId || createFallbackId(),
      }
    );
  } catch (error) {
    console.warn(
      "Saving allergy update to fallback storage because the backend update failed.",
      error
    );

    const allergies = readFallbackAllergies(patientId);
    const updated: PatientAllergy = {
      ...payload,
      allergyId: payload.allergyId || createFallbackId(),
    };

    writeFallbackAllergies(
      patientId,
      allergies.map((item) =>
        item.allergyId === updated.allergyId
          ? updated
          : item
      )
    );

    return updated;
  }
};

export const deletePatientAllergy = async (
  patientId: string,
  allergyId: string
): Promise<void> => {
  try {
    await api.delete(
      `/patients/${patientId}/allergies/${allergyId}`
    );
  } catch (error) {
    console.warn(
      "Deleting allergy from fallback storage because the backend delete failed.",
      error
    );

    const allergies = readFallbackAllergies(patientId);

    writeFallbackAllergies(
      patientId,
      allergies.filter(
        (item) => item.allergyId !== allergyId
      )
    );
  }
};
