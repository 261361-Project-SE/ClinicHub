"use client";

import { useAppointmentStore } from "@/stores/useAppointmentStore";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const fetchAppointments = useAppointmentStore(
    (state) => state.fetchAppointments
  );

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return <Component {...pageProps} />;
}
