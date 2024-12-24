import axios from "axios";

export const postRequest = async (
  firstName: string,
  lastName: string,
  phone: string,
  symptom: string,
  appointment_dateTime: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:4444/appointment/create`,
      {
        firstname: firstName,
        lastname: lastName,
        phone_number: phone,
        symptom: symptom,
        appointment_dateTime: appointment_dateTime,
      }
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Error while creating appointment service: ${
          error.response?.data || error.message
        }`
      );
    } else {
      throw new Error(
        `Error while creating appointment service: ${String(error)}`
      );
    }
  }
};

export const Requestcheckbooking = async (
  firstName: string,
  lastName: string,
  phone: string
) => {
  try {
    const response = await axios.get(
      `http://localhost:4444/patient/appointment?firstName=${firstName}&lastName=${lastName}&phone=${phone}`
    );
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error while checking booking service: ${error.message}`);
    } else {
      throw new Error(`Error while checking booking service: ${String(error)}`);
    }
  }
};
