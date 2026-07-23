/**
 * Shared field validators. Each returns an error string, or null when valid.
 */

const NAME_RE = /^[A-Za-z][A-Za-z .'-]{1,49}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Indian mobile: 10 digits starting 6-9.
const PHONE_RE = /^[6-9]\d{9}$/;
const PIN_RE = /^[1-9]\d{5}$/;

export const validateName = (value: string, label = "Name"): string | null => {
  const v = value.trim();
  if (!v) return `${label} is required.`;
  if (!NAME_RE.test(v))
    return `${label} must be 2-50 letters and cannot contain digits.`;
  return null;
};

export const validateEmail = (value: string): string | null => {
  const v = value.trim();
  if (!v) return "Email is required.";
  if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
  return null;
};

/**
 * Strong password: at least 8 characters with an uppercase letter, a
 * lowercase letter, a digit and a special character.
 */
export const validatePassword = (value: string): string | null => {
  if (!value) return "Password is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[a-z]/.test(value))
    return "Password must include a lowercase letter.";
  if (!/[A-Z]/.test(value))
    return "Password must include an uppercase letter.";
  if (!/\d/.test(value)) return "Password must include a number.";
  if (!/[^A-Za-z0-9]/.test(value))
    return "Password must include a special character.";
  return null;
};

export const validatePhone = (
  value: string,
  label = "Phone number"
): string | null => {
  const v = value.trim();
  if (!v) return `${label} is required.`;
  if (!PHONE_RE.test(v))
    return `${label} must be a valid 10-digit mobile number.`;
  return null;
};

export const validatePinCode = (value: string): string | null => {
  const v = value.trim();
  if (!v) return "PIN code is required.";
  if (!PIN_RE.test(v)) return "PIN code must be 6 digits.";
  return null;
};

export const validateRequired = (
  value: string,
  label: string
): string | null => {
  if (!value || !value.trim()) return `${label} is required.`;
  return null;
};
