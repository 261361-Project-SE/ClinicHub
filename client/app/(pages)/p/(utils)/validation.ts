export const validateName = (name: string): boolean => {
  return /^[\u0E00-\u0E7F\s]+$/.test(name) && name.trim() !== "";
};

export const validatePhone = (phone: string): boolean => {
  return /^\d{10}$/.test(phone);
};

export const validateSymptom = (symptom: string): boolean => {
  return /^[\u0E00-\u0E7F\s]+$/.test(symptom) && symptom.trim() !== "";
};
