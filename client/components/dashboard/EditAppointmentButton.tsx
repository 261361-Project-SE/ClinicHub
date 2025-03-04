import { AppointmentStatusSelector } from "./AppointmentStatusSelector";
import { AppointmentTimeSelector } from "./AppointmentTimeSelector";
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
import { useState } from "react";
import { toast } from "sonner";

export const EditAppointmentButton: React.FC<AppointmentProps> = (props) => {
  const { appointment_dateTime, appointment_status, id } = props;
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleNewTimeChange = async (newTime: string) => {
    const formattedTime = `${newTime.slice(0, 2)}:${newTime.slice(2)}`;
    const newAppointmentDateTime = `${formattedDate}T${formattedTime}:00.000`;

    await saveTimeChanges(newAppointmentDateTime);
  };

  const handleNewStatusChange = async (newStatus: string) => {
    await saveStatusChanges(newStatus);
  };

  const saveTimeChanges = async (dateTime: string) => {
    setLoading(true);
    try {
      await axios.patch(`${SERVER_URL}/doctor/appointment/update`, {
        id,
        appointment_dateTime: dateTime,
      });
      toast.success("เวลานัดหมายถูกแก้ไขเรียบร้อยแล้ว!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("มีข้อผิดพลาดในการแก้ไขเวลานัดหมาย");
    } finally {
      setLoading(false);
    }
  };

  const saveStatusChanges = async (status: string) => {
    setLoading(true);
    try {
      await axios.patch(`${SERVER_URL}/doctor/appointment/update`, {
        id,
        status: status,
      });
      toast.success("สถานะการนัดหมายถูกแก้ไขเรียบร้อยแล้ว!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("มีข้อผิดพลาดในการแก้ไขสถานะนัดหมาย");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          แก้ไข
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 rounded-xl">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 mr-2 text-pink-200 animate-spin" />
            <span>กำลังอัพเดทข้อมูล...</span>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">จัดการการนัดหมาย</h4>
              <p className="text-sm text-muted-foreground">
                แก้ไขเวลานัดหมายและสถานะ (บันทึกทันทีเมื่อเลือก)
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
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
