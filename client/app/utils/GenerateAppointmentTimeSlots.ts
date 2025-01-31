export const GenerateAppointmentTimeSlots = (
  startTime: string,
  endTime: string,
  timeInterval: number
): string[] => {
  if (timeInterval <= 0) {
    throw new Error("สล็อตเวลาการจองต้องมีค่ามากกว่า 0");
  }

  const slots: string[] = [];
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let currentTime = new Date(0, 0, 0, startHour, startMinute);
  const endTimeDate = new Date(0, 0, 0, endHour, endMinute);

  while (currentTime <= endTimeDate) {
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    slots.push(`${hours}${minutes}`);
    currentTime.setMinutes(currentTime.getMinutes() + timeInterval);
  }

  return slots;
};
