export interface Appointment {
  id: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  symptom: string;
  appointment_dateTime: string;
  appointment_status: "CONFIRMED" | "CANCELED" | "COMPLETED" | "PENDING";
}
