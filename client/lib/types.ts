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

export interface IPatientData {
  PatientID?: string;
  FirstName: string;
  LastName: string;
  citizenID: string;
  age: number;
  Gender: string;
  BirthDate: string;
  address: string;
  Phone: string;
  emergencyContact: string;
  relationship: string;
  bloodType: string;
  occupation: string;
  Height: number;
  Weight: number;
  chronicDisease: string;
  allergic: string;
  allergicFood: string;
  allergicMedicine: string;
  role: string;
  imageUrl: string;
  created_at: string;
  LastAppointment: string;
}
