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
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-darkgray">
          <TableHead className="w-[100px]">หมายเลขนัด</TableHead>
          <TableHead>คนไข้</TableHead>
          <TableHead>อาการ</TableHead>
          <TableHead className="text-right">เวลา</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.slice(0, 4).map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.id}</TableCell>
            <TableCell>
              {appointment.firstname} {appointment.lastname}
            </TableCell>
            <TableCell>{appointment.symptom}</TableCell>
            <TableCell className="text-right">
              {appointment.appointment_status}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AppointmentTable;
