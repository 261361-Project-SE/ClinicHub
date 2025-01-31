import { Appointment } from "../types/appointment";
import { useState } from "react";

interface SearchAppointmentsProps {
  appointments: Appointment[];
  onSearch: (filteredAppointments: Appointment[]) => void;
}

const SearchAppointments: React.FC<SearchAppointmentsProps> = ({
  appointments,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchByDate, setSearchByDate] = useState(false);

  const handleSearch = () => {
    let filteredAppointments = [...appointments];

    if (searchTerm) {
      // แยกวันที่และเวลา
      const dateTimeParts = searchTerm.split(" ");
      const datePart = dateTimeParts[0];
      const timePart = dateTimeParts[1];

      // แยกวันที่
      const dateParts = datePart.split("/");
      let searchDate = new Date();

      // ถ้าผู้ใช้กรอกเป็นรูปแบบ dd/mm/yyyy
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // เดือนต้องเป็น 0-based
        const year = parseInt(dateParts[2], 10);
        searchDate = new Date(year, month, day);
      } else if (dateParts.length === 2) {
        // ถ้าผู้ใช้กรอกแค่วัน/เดือน
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        searchDate = new Date();
        searchDate.setDate(day);
        searchDate.setMonth(month);
      } else if (dateParts.length === 1) {
        // ถ้าผู้ใช้กรอกแค่วัน
        const day = parseInt(dateParts[0], 10);
        searchDate.setDate(day);
      }

      // ค้นหาตามวันที่
      filteredAppointments = filteredAppointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.appointment_dateTime);
        const isSameDay =
          appointmentDate.getDate() === searchDate.getDate() &&
          appointmentDate.getMonth() === searchDate.getMonth() &&
          appointmentDate.getFullYear() === searchDate.getFullYear();

        // ถ้ามีการกรอกเวลา, ค้นหาตามเวลา
        if (isSameDay && timePart) {
          const timeParts = timePart.split(":");
          let hours = 0;
          let minutes = 0;
          let seconds = 0;

          if (timeParts.length === 2) {
            // รูปแบบ HH:mm
            hours = parseInt(timeParts[0], 10);
            minutes = parseInt(timeParts[1], 10);
          } else if (timeParts.length === 3) {
            // รูปแบบ HH:mm:ss
            hours = parseInt(timeParts[0], 10);
            minutes = parseInt(timeParts[1], 10);
            seconds = parseInt(timeParts[2], 10);
          } else if (timeParts.length === 1) {
            // รูปแบบ HH
            hours = parseInt(timeParts[0], 10);
          }

          const appointmentTime = new Date(appointment.appointment_dateTime);
          const isSameTime =
            appointmentTime.getHours() === hours &&
            appointmentTime.getMinutes() === minutes &&
            appointmentTime.getSeconds() === seconds;

          return isSameDay && isSameTime;
        }

        return isSameDay;
      });
    }

    onSearch(filteredAppointments);
  };

  return (
    <div className="mb-4 flex justify-between items-center">
      <div className="flex items-center w-full">
        <input
          type="text"
          placeholder="กรุณากรอกวันที่ dd/mm/yyyy"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={handleSearch}
        />
      </div>
      <button
        className="ml-2 p-2 bg-pink-200 text-white rounded-md"
        onClick={handleSearch}
      >
        ค้นหา
      </button>
    </div>
  );
};

export default SearchAppointments;
