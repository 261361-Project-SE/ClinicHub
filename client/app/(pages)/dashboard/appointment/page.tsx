"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";

const DesktopAppointment = dynamic(
  () => import("@/app/(pages)/dashboard/desktop/appointment/page"),
  { ssr: false }
);
const MobileAppointment = dynamic(
  () => import("@/app/(pages)/dashboard/mobile/appointment/page"),
  { ssr: false }
);

export default function AppointmentPage() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? <MobileAppointment /> : <DesktopAppointment />;
}
