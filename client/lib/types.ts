export type AppointmentTableProps = {
  appointments: {
    id: string;
    eventId: string;
    firstname: string;
    lastname: string;
    phone_number: string;
    symptom: string;
    appointment_dateTime: string;
    appointment_status: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type PatientTableProps = {
  patients: {
    PatientID: number; // Primary key
    FirstName: string;
    LastName: string;
    Age: number;
    Gender: string; // ENUM
    CitizenID: string; // National ID
    BirthDate: string; // Date of birth
    Address: string; // Address
    Phone: string; // Phone number
    EmergencyContact: string; // Emergency contact
    Status: string; // Patient status
    Occupation: string; // Job
    Height: number; // Height in cm
    Weight: number; // Weight in kg
    ChronicDisease: string; // Chronic diseases
    Allergies: string; // Allergies
    created_at: string; // Timestamp
    updated_at: string; // Timestamp
  }[];
};
