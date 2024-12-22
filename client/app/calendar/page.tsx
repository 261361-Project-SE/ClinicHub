import React from "react";

const CalendarPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=mongkolclinic.calendar%40gmail.com&ctz=Asia%2FBangkok"
        className="w-full border-0"
      ></iframe>
    </div>
  );
};

export default CalendarPage;
