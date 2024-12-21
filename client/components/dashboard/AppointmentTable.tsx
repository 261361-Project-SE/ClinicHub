import {
  Table,
  TableBody,
  TableCaption,
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
        <TableRow>
          <TableHead className="w-[100px]">ไอดีการนัด</TableHead>
          <TableHead>คนไข้</TableHead>
          <TableHead>อาการ</TableHead>
          <TableHead className="text-right">เวลา</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.id}</TableCell>
            <TableCell>
              {appointment.firstname} {appointment.lastname}
            </TableCell>
            <TableCell>{appointment.symptom}</TableCell>
            <TableCell className="text-right">{appointment.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AppointmentTable;
