"use client";

import { AppointmentProps } from "@/lib/types";
import { SERVER_URL } from "@/lib/variables";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

export const useFetchAppointments = () => {
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${SERVER_URL}/doctor/appointment`);
      const appointmentsData = response.data;
      setAppointments(
        appointmentsData.map((appointment: AppointmentProps) => ({
          ...appointment,
          appointment_dateTime: new Date(appointment.appointment_dateTime),
        }))
      );
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err) && err.response?.data
          ? err.response.data.message
          : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return { appointments, loading, error, refetch: fetchAppointments };
};
