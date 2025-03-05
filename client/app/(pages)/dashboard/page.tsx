"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DesktopDashboard = dynamic(
  () => import("@/app/(pages)/dashboard/desktop/page"),
  {
    ssr: false,
  }
);
const MobileDashboard = dynamic(
  () => import("@/app/(pages)/dashboard/mobile/page"),
  {
    ssr: false,
  }
);

function useMediaQuery({ maxWidth }: { maxWidth: number }) {
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

export default function DashboardPage() {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}
