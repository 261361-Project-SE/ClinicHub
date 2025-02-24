"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DesktopAppointment = dynamic(
  () => import("@/app/(pages)/dashboard/desktop/appointment/page"),
  {
    ssr: false,
  }
);
const MobileAppointment = dynamic(
  () => import("@/app/(pages)/dashboard/mobile/appointment/page"),
  {
    ssr: false,
  }
);

export default function AppointmentPage() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? <MobileAppointment /> : <DesktopAppointment />;
}
export function useMediaQuery({ maxWidth }: { maxWidth: number }) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${maxWidth}px)`);
    setMatches(query.matches);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, [maxWidth]);

  return matches;
}
