"use client";

import MobileDashboardLayout from "@/components/dashboard/mobile/MobileDashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { AppointmentTimeSlots, SERVER_URL } from "@/lib/variables";
import axios from "axios";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const MobileCreateAppointmentPage = () => {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    firstname: "",
    lastname: "",
    phone_number: "",
    symptom: "",
    appointment_date: "",
    appointment_time: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setAppointmentForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setAppointmentForm((prev) => ({
        ...prev,
        appointment_date: format(date, "yyyy-MM-dd"),
      }));
    }
  };

  const handleTimeSelect = (time: string) => {
    setAppointmentForm((prev) => ({
      ...prev,
      appointment_time: time,
    }));
  };

  const handleCreateAppointment = async () => {
    const {
      firstname,
      lastname,
      phone_number,
      symptom,
      appointment_date,
      appointment_time,
    } = appointmentForm;

    if (
      !firstname ||
      !lastname ||
      !phone_number ||
      !appointment_date ||
      !appointment_time ||
      !symptom
    ) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const formattedTime = `${appointment_time.slice(
      0,
      2
    )}:${appointment_time.slice(2)}`;
    const dateTimeString = `${appointment_date}T${formattedTime}:00.000`;

    setIsCreating(true);
    try {
      await axios.post(`${SERVER_URL}/appointment/create`, {
        ...appointmentForm,
        appointment_dateTime: dateTimeString,
      });
      toast.success("การนัดหมายถูกสร้างเรียบร้อยแล้ว!");
      router.push("/dashboard/mobile/appointment");
    } catch (error) {
      toast.error("มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <MobileDashboardLayout>
      <div className="fixed top-0 z-50 w-full px-4 py-6 bg-white">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 text-gray-700"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-medium">สร้างการนัดหมาย</h2>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 px-4 py-4 mt-[80px]">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="firstname">ชื่อ</Label>
            <Input
              id="firstname"
              value={appointmentForm.firstname}
              onChange={handleInputChange}
              className="mt-1 bg-white"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="lastname">นามสกุล</Label>
            <Input
              id="lastname"
              value={appointmentForm.lastname}
              onChange={handleInputChange}
              className="mt-1 bg-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone_number">เบอร์โทรศัพท์</Label>
          <Input
            id="phone_number"
            maxLength={10}
            value={appointmentForm.phone_number}
            onChange={handleInputChange}
            className="mt-1 bg-white"
          />
        </div>

        <div>
          <Label htmlFor="symptom">บันทึกย่อ</Label>
          <Textarea
            id="symptom"
            placeholder="อาการเบื้องต้นหรือรายละเอียดต่าง ๆ"
            value={appointmentForm.symptom}
            onChange={handleInputChange}
            className="mt-1 bg-white"
          />
        </div>

        <div>
          <Label className="mb-1">วันที่นัด</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start w-full bg-white"
              >
                {appointmentForm.appointment_date
                  ? format(new Date(appointmentForm.appointment_date), "PPP", {
                      locale: th,
                    })
                  : "เลือกวันที่"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={
                  appointmentForm.appointment_date
                    ? new Date(appointmentForm.appointment_date)
                    : undefined
                }
                onSelect={handleDateSelect}
                initialFocus
                locale={th}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label className="mb-1">เวลานัด</Label>
          <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto">
            {AppointmentTimeSlots.map((time) => (
              <Button
                key={time}
                variant={
                  appointmentForm.appointment_time === time
                    ? "default"
                    : "outline"
                }
                onClick={() => handleTimeSelect(time)}
                className="bg-white"
              >
                {`${time.slice(0, 2)}:${time.slice(2)}`}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex mt-4 gap-2">
          <Button
            variant="outline"
            className="flex-1 rounded-full"
            onClick={() => router.back()}
          >
            ยกเลิก
          </Button>
          <Button
            className="flex-1 bg-pink-200 hover:bg-pink-200/90 rounded-full"
            onClick={handleCreateAppointment}
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                กำลังสร้าง...
              </>
            ) : (
              "สร้างการนัด"
            )}
          </Button>
        </div>
      </div>
    </MobileDashboardLayout>
  );
};

export default MobileCreateAppointmentPage;
