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
    const appointments = response.data.data;
    console.log(appointments);
    if (!Array.isArray(appointments)) {
      console.error("appointments is not an array", appointments);
      return []; // หรือจัดการกรณีที่ appointments ไม่ใช่อาร์เรย์
    }
    const times = appointments.map((appointment: any) => {
      const timeString = appointment.appointment_dateTime
        .split("T")[1]
        .split(".")[0];
      console.log(timeString.substring(0, 5));
      return timeString.substring(0, 5); // ตัดเวลาที่ได้ออกมาเป็น 07:30
    });
    return times; // Returns an array of times
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return [];
      }
      throw new Error(
        `Error while fetching appointment service: ${
          error.response?.data || error.message
        }`
      );
    } else {
      throw new Error(
        `Error while fetching appointment service: ${String(error)}`
      );
    }
  }
};
