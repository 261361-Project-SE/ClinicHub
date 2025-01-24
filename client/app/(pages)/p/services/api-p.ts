import axios from "axios";
import { split } from "postcss/lib/list";

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

export const getfilteredAppointment = async (appointment_dateTime: string) => {
  try {
    const date = appointment_dateTime.split("T")[0];
    const response = await axios.get(
      `http://localhost:4444/appointment/time-slot?date=${date}`
    );

    // Extensive logging to diagnose the issue
    console.log("Full response:", response);
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    console.log("Response data:", JSON.stringify(response.data, null, 2));

    // More robust data extraction
    const appointmentsData = response.data?.data ?? response.data;

    // Validate data is an array
    const appointments = Array.isArray(appointmentsData)
      ? appointmentsData
      : [];

    if (appointments.length === 0) {
      console.warn("No appointments found for the given date");
      return [];
    }

    const times = appointments
      .map((appointment: any) => {
        try {
          const timeString = appointment.appointment_dateTime
            .split("T")[1]
            .split(".")[0];
          return timeString.substring(0, 5);
        } catch (mapError) {
          console.error("Error processing appointment time:", mapError);
          return null;
        }
      })
      .filter((time) => time !== null);

    return times;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      if (error.response?.status === 404) {
        return [];
      }
      throw new Error(
        `Error fetching appointments: ${error.response?.data || error.message}`
      );
    } else {
      throw new Error(`Unexpected error: ${String(error)}`);
    }
  }
};
export const getfilterpatient = async (
  phoneNumber: string,
  firstname: string,
  lastname: string
) => {
  try {
    // Build the query string using template literals
    const response = await axios.get(
      `http://localhost:4444/patient/appointment?phoneNumber=${phoneNumber}&firstname=${encodeURIComponent(
        firstname
      )}&lastname=${encodeURIComponent(lastname)}`
    );

    // Logging for debugging
    console.log("Full response:", response);
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
    console.log("Response data:", JSON.stringify(response.data, null, 2));

    // Extract data robustly
    const appointmentsData = response.data?.data ?? response.data;

    // Validate that the result is an array
    const appointments = Array.isArray(appointmentsData)
      ? appointmentsData
      : [];

    if (appointments.length === 0) {
      console.warn("No appointments found for the given details");
      return [];
    }

    return appointments;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      // Handle 404 (Not Found) gracefully
      if (error.response?.status === 404) {
        return [];
      }

      throw new Error(
        `Error fetching patient appointments: ${
          error.response?.data || error.message
        }`
      );
    } else {
      throw new Error(`Unexpected error: ${String(error)}`);
    }
  }
};
