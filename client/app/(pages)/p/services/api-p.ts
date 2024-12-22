import axios from "axios";

// const API_END_POINT = process.env.API_END_POINT || "http://localhost:5000";

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
