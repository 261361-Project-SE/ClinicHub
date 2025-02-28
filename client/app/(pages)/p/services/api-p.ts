import { Appointment } from "../types/appointment";
import axios from "axios";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL_API}`;

export const postRequest = async (
  firstName: string,
  lastName: string,
  phone: string,
  symptom: string,
  appointment_dateTime: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/appointment/create`, {
      firstname: firstName,
      lastname: lastName,
      phone_number: phone,
      symptom: symptom,
      appointment_dateTime: appointment_dateTime,
    });
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

export const getfilteredAppointment = async (
  appointment_dateTime: string
): Promise<string[]> => {
  try {
    const date = appointment_dateTime.split("T")[0];
    const response = await axios.get<ApiResponse<Appointment[]>>(
      `${API_BASE_URL}/appointment/time-slot?date=${date}`
    );

    const appointmentsData = response.data?.data ?? response.data;

    const appointments = Array.isArray(appointmentsData)
      ? appointmentsData
      : [];

    if (appointments.length === 0) {
      console.warn("No appointments found for the given date");
      return [];
    }

    const times = appointments
      .map((appointment: Appointment) => {
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
      .filter((time): time is string => time !== null);

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
        `Error fetching appointments: ${
          error.response?.data?.error || error.message
        }`
      );
    } else {
      throw new Error(`Unexpected error: ${String(error)}`);
    }
  }
};

interface Feedback {
  rating: number;
  comment: string;
}

export const createFeedback = async (rating: number, comment: string) => {
  try {
    const response = await axios.post<Feedback>(
      `${API_BASE_URL}/feedback/create`,
      {
        rating,
        comment,
      }
    );

    if (!response.data) {
      throw new Error(response.data || "Failed to create feedback");
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Error while creating feedback: ${
          error.response?.data?.error || error.message
        }`
      );
    } else {
      throw new Error(`Error while creating feedback: ${String(error)}`);
    }
  }
};
