import { formattedDateTime } from "@/app/utils/formattedDateTime";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppointmentTableProps } from "@/lib/types";

const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
}) => {
  const getTime = (appointments_dateTime: string) => {
    const { time }: { time: string } = formattedDateTime(appointments_dateTime);
    return time;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-darkgray">
          <TableHead className="w-[10px]">ไอดี</TableHead>
          <TableHead>คนไข้</TableHead>
          <TableHead>อาการ</TableHead>
          <TableHead className="text-right">เวลา</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-darkgray">
              ไม่มีการนัดหมาย
            </TableCell>
          </TableRow>
        ) : (
          appointments.slice(0, 4).map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">{appointment.id}</TableCell>
              <TableCell>
                {appointment.firstname} {appointment.lastname}
              </TableCell>
              <TableCell>{appointment.symptom}</TableCell>
              <TableCell className="text-right">
                {getTime(appointment.appointment_dateTime)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AppointmentTable;
