import { formattedDateTime } from "@/app/utils/formattedDateTime";
import { EditAppointmentButton } from "@/components/dashboard/EditAppointmentButton";
import { AppointmentProps } from "@/lib/types";
import { AppointmentStatus } from "@/lib/variables";
import { ClipboardPlusIcon, Clock4Icon } from "lucide-react";

const AppointmentCard: React.FC<AppointmentProps> = (props) => {
  const {
    id,
    firstname,
    lastname,
    symptom,
    appointment_dateTime,
    selectedFilter,
    appointment_status,
  } = props as AppointmentProps & {
    appointment_status: keyof typeof AppointmentStatus;
  };
  const { shortDate, time, weekday } = formattedDateTime(appointment_dateTime);
  const currentDate = new Date();
  const isSameDate =
    new Date(appointment_dateTime).getDate() === currentDate.getDate();
  const endOfBookingTime =
    new Date(appointment_dateTime).getTime() + 15 * 60000;
  const formattedEndOfBookingTime = formattedDateTime(endOfBookingTime).time;
  const isHistoryOrCanceled =
    selectedFilter === "canceled" || selectedFilter === "history";

  const statusInfo = AppointmentStatus[appointment_status] || {
    label: "สถานะไม่ทราบ",
  };

  return (
    <div
      key={id}
      className="flex items-center py-1 border border-[##E5E5E5] gap-x-4 rounded-xl"
    >
      <div
        className={`flex flex-col items-center w-1/12 gap-y-2 border-r p-1 border-r-[#E5E5E5] font-medium ${
          isSameDate ? "text-pink-200" : "text-darkgray"
        }`}
      >
        <div>{weekday}</div>
        <div className="text-2xl">{shortDate}</div>
      </div>
      <div className="flex items-start justify-between w-full mr-4 gap-x-16">
        <div className="flex w-full gap-x-32">
          <div className="flex flex-col w-1/5 gap-y-1">
            <div className="flex items-center text-sm gap-x-1 text-darkgray">
              <Clock4Icon className="mt-0.5" size={14} />
              {time} - {formattedEndOfBookingTime}
            </div>
            <div className="flex items-center text-sm gap-x-1 text-darkgray">
              <ClipboardPlusIcon className="mt-0.5" size={14} /> {symptom}
            </div>
          </div>
          <div>
            <div>
              คนไข้ {firstname} {lastname}
            </div>
          </div>
        </div>
        <div>
          {!isHistoryOrCanceled && <EditAppointmentButton {...props} />}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
