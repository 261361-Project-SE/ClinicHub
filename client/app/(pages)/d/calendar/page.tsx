import React from "react";

const CanlendarPage = () => {
  return (
    <div className="flex items-center justify-center h-full bg-white rounded-xl shadow-shadow-bg">
      <iframe
        src="https://calendar.google.com/calendar/embed?src=mongkolclinic.calendar%40gmail.com&ctz=Asia%2FBangkok"
        className="w-full h-full border-0 rounded-xl"
      ></iframe>
    </div>
  );
};

export default CanlendarPage;
