export type AppointmentProps = {
  id?: string;
  eventId?: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  symptom: string;
  appointment_dateTime: string;
  appointment_status: string;
  selectedFilter?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AppointmentTableProps = {
  appointments: AppointmentProps[];
};

export type PatientProps = {
  PatientID: number;
  FirstName: string;
  LastName: string;
  Age: number;
  Gender: string;
  CitizenID: string;
  BirthDate: string;
  Address: string;
  Phone: string;
  EmergencyContact: string;
  Status: string;
  Occupation: string;
  LastAppointment: string;
  Height: number;
  Weight: number;
  ChronicDisease: string;
  Allergies: string;
  created_at: string;
  updated_at: string;
};

export type PatientTableProps = {
  patients: PatientProps[];
};
