import React from "react";

const CalendarPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=mongkolclinic.calendar%40gmail.com&ctz=Asia%2FBangkok"
        className="border-0 w-full h-full"
      ></iframe>
    </div>
  );
};

export default CalendarPage;
