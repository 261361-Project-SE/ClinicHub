export const formattedDateTime = (
  appointment_dateTime: string | number | Date
): { shortDate: string; time: string; weekday: string } => {
  const date = new Date(appointment_dateTime);
  const shortDate = date.toLocaleDateString("th-TH", {
    day: "numeric",
  });
  const weekday = date
    .toLocaleDateString("th-TH", {
      weekday: "short",
    })
    .replace("วัน", "");
  const time = date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { shortDate, time, weekday };
};
