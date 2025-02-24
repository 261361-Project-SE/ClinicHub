import { useEffect, useState } from "react";

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
