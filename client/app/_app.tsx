"use client";

import { useAppointmentStore } from "@/stores/useAppointmentStore";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);
  const fetchAppointments = useAppointmentStore(
    (state) => state.fetchAppointments
  );

  useEffect(() => {
    fetchAppointments();
    setIsMounted(true);
  }, [fetchAppointments]);

  return isMounted ?? <Component {...pageProps} />;
}
