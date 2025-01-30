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
import { useState } from "react";
import { toast } from "sonner";

export const AppointmentPopover: React.FC<AppointmentProps> = (props) => {
  const { appointment_dateTime, appointment_status, id } = props;
  const [newAppointmentTime, setNewAppointmentTime] =
    useState(appointment_dateTime);
  const [newAppointmentStatus, setNewAppointmentStatus] =
    useState(appointment_status);
  const appointmentStatusLabel = (() => {
    switch (appointment_status) {
      case "PENDING":
        return "รอการตอบรับ";
      case "CONFIRMED":
        return "ยืนยันแล้ว";
      case "CANCELED":
        return "ปฏิเสธ";
      default:
        return "";
    }
  })();

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

  const handleNewTimeChange = (newTime: string) => {
    setNewAppointmentTime(newTime);
  };

  const handleNewStatusChange = (newStatus: string) => {
    setNewAppointmentStatus(newStatus);
  };

  const handleSaveChanges = async () => {
    const appointmentUpdateForm = {
      appointment_status: newAppointmentStatus,
    };

    if (!newAppointmentTime || !newAppointmentStatus) {
      toast.error("ไม่พบการเปลี่ยนแปลง");
      return;
    }

    const formattedTime = `${newAppointmentTime.slice(
      0,
      2
    )}:${newAppointmentTime.slice(2)}`;

    const newAppointmentDateTime = `${formattedDate}T${formattedTime}:00.000`;

    try {
      await axios.patch(`${SERVER_URL}/doctor/appointment/update`, {
        id,
        status: newAppointmentStatus,
        appointment_time: newAppointmentDateTime,
      });
      toast.success("การนัดหมายถูกสร้างเรียบร้อยแล้ว!");
    } catch (error) {
      toast.error("มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง");
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
              />
            </div>
            <div className="items-center mt-2 grid grid-cols-1 gap-4">
              <Label htmlFor="maxWidth">สถานะ</Label>
              <AppointmentStatusSelector
                defaultValue={appointmentStatusLabel}
                setValue={handleNewStatusChange}
              />
            </div>
            <div className="items-center mt-2 grid grid-cols-1 gap-4">
              <ConfirmButton
                buttonTitle="บันทึก"
                title="บันทึกการเปลี่ยนแปลง"
                description="คุณแน่ใจหรือไม่ว่าต้องการบันทึกการเปลี่ยนแปลงนี้"
                cancelTitle="ยกเลิก"
                confirmTitle="บันทึก"
                onConfirm={handleSaveChanges}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
