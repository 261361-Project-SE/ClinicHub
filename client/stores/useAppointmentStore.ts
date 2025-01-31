import { AppointmentProps } from "@/lib/types";
import { SERVER_URL } from "@/lib/variables";
import axios from "axios";
import { create } from "zustand";

interface AppointmentState {
  appointments: AppointmentProps[] | null;
  loading: boolean;
  error: string | null;
  fetchAppointments: () => Promise<void>;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: null,
  loading: false,
  error: null,

  fetchAppointments: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get<AppointmentProps[]>(
        `${SERVER_URL}/doctor/appointment`
      );
      set({ appointments: data, loading: false });
    } catch (error: unknown) {
      set({
        error:
          axios.isAxiosError(error) && error.response?.data
            ? error.response.data.message
            : "Failed to fetch appointments",
        loading: false,
      });
    }
  },
}));
