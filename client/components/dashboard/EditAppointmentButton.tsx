import { AppointmentStatusSelector } from "./AppointmentStatusSelector";
import { AppointmentTimeSelector } from "./AppointmentTimeSelector";
import { ConfirmButton } from "./ConfirmButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AppointmentProps } from "@/lib/types";
import { SERVER_URL } from "@/lib/variables";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";

export const EditAppointmentButton: React.FC<AppointmentProps> = (props) => {
  const { appointment_dateTime, appointment_status, id } = props;
  const [loading, setLoading] = useState(false);
  const [newAppointmentTime, setNewAppointmentTime] = useState("");
  const [newAppointmentStatus, setNewAppointmentStatus] =
    useState(appointment_status);

  const formattedDate = new Date(appointment_dateTime)
    .toISOString()
    .split("T")[0];

  const appointmentTime = new Date(appointment_dateTime).toLocaleTimeString(
    "th-TH",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const originalTimeFormatted = appointmentTime.replace(":", "");

  const handleNewTimeChange = (newTime: string) => {
    setNewAppointmentTime(newTime);
  };

  const handleNewStatusChange = (newStatus: string) => {
    setNewAppointmentStatus(newStatus);
  };

  const hasChanges = useMemo(() => {
    const timeChanged =
      newAppointmentTime !== "" && newAppointmentTime !== originalTimeFormatted;
    const statusChanged = newAppointmentStatus !== appointment_status;
    return timeChanged || statusChanged;
  }, [
    newAppointmentTime,
    newAppointmentStatus,
    originalTimeFormatted,
    appointment_status,
  ]);

  const handleSaveChanges = async () => {
    if (!hasChanges) {
      toast.error("ไม่พบการเปลี่ยนแปลง");
      return;
    }

    const timeToUse = newAppointmentTime || originalTimeFormatted;
    const formattedTime = `${timeToUse.slice(0, 2)}:${timeToUse.slice(2)}`;

    const newAppointmentDateTime = `${formattedDate}T${formattedTime}:00.000`;

    setLoading(true);
    try {
      await axios.patch(`${SERVER_URL}/doctor/appointment/update`, {
        id,
        status: newAppointmentStatus,
        appointment_dateTime: newAppointmentDateTime,
      });
      toast.success("การนัดหมายถูกแก้ไขเรียบร้อยแล้ว!");
    } catch (error) {
      toast.error("มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          แก้ไข
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 rounded-xl">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">จัดการการนัดหมาย</h4>
            <p className="text-sm text-muted-foreground">
              แก้ไขเวลานัดหมายและสถานะ
            </p>
          </div>
          <div className="grid gap-2">
            <div className="items-center grid grid-cols-1 gap-4">
              <Label htmlFor="width">เวลานัด</Label>
              <AppointmentTimeSelector
                setValue={handleNewTimeChange}
                defaultValue={appointmentTime}
                appointment_time={appointmentTime}
              />
            </div>
            <div className="items-center mt-2 grid grid-cols-1 gap-4">
              <Label htmlFor="maxWidth">สถานะ</Label>
              <AppointmentStatusSelector
                defaultValue={appointment_status}
                setValue={handleNewStatusChange}
              />
            </div>
            <div className="items-center mt-2 grid grid-cols-1 gap-4">
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังแก้ไขนัดหมาย...
                </Button>
              ) : (
                <ConfirmButton
                  buttonTitle="บันทึก"
                  title="บันทึกการเปลี่ยนแปลง"
                  description="คุณแน่ใจหรือไม่ว่าต้องการบันทึกการเปลี่ยนแปลงนี้"
                  cancelTitle="ยกเลิก"
                  confirmTitle="บันทึก"
                  onConfirm={handleSaveChanges}
                  disabled={!hasChanges}
                />
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
