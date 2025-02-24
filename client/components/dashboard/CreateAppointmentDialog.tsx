import { AppointmentDatePicker } from "@/components/dashboard/AppointmentDatePicker";
import { AppointmentTimeSelector } from "@/components/dashboard/AppointmentTimeSelector";
import { ConfirmButton } from "@/components/dashboard/ConfirmButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SERVER_URL } from "@/lib/variables";
import axios from "axios";
import { Loader2, PlusIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CreateAppointmentDialog = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isCreatingAppointment, setIsAppointmentCreating] = useState(false);
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
    setAppointmentForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleConfirmCreateAppointment = async () => {
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

    setIsAppointmentCreating(true);
    try {
      await axios.post(`${SERVER_URL}/appointment/create`, {
        ...appointmentForm,
        appointment_dateTime: dateTimeString,
      });
      toast.success("การนัดหมายถูกสร้างเรียบร้อยแล้ว!");

      setAppointmentForm({
        firstname: "",
        lastname: "",
        phone_number: "",
        symptom: "",
        appointment_date: "",
        appointment_time: "",
      });
      setIsAppointmentCreating(false);
      setIsAppointmentModalOpen(false);
    } catch (error) {
      toast.error("มีข้อผิดพลาดเกิดขึ้น กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <Dialog
      open={isAppointmentModalOpen}
      onOpenChange={setIsAppointmentModalOpen}
    >
      <DialogTrigger className="flex items-center px-4 font-medium text-white bg-pink-200 hover:bg-pink-200/90 rounded-2xl h-14">
        <PlusIcon className="mr-1" />
        สร้างการนัดหมาย
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="mb-2">สร้างการนัดหมาย</DialogTitle>
        </DialogHeader>
        <p id="dialog-description" className="mb-2 text-sm text-gray-500">
          กรุณากรอกรายละเอียดการนัดหมายให้ครบถ้วนก่อนกดยืนยัน
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirmCreateAppointment();
          }}
        >
          <div className="flex flex-col gap-y-4 text-darkgray">
            <div className="flex flex-col gap-y-2">
              <div className="flex gap-2">
                <div className="w-1/2">
                  <Label htmlFor="firstname">ชื่อ</Label>
                  <Input
                    type="text"
                    id="firstname"
                    value={appointmentForm.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/2">
                  <Label htmlFor="lastname">นามสกุล</Label>
                  <Input
                    type="text"
                    id="lastname"
                    value={appointmentForm.lastname}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <Label htmlFor="phone_number">เบอร์โทรศัพท์</Label>
            <Input
              type="text"
              id="phone_number"
              maxLength={10}
              value={appointmentForm.phone_number}
              onChange={handleInputChange}
            />
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="symptom">บันทึกย่อ</Label>
              <Textarea
                placeholder="คนไข้ไม่สบายตัว ปวดหัว"
                id="symptom"
                maxLength={16}
                value={appointmentForm.symptom}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label htmlFor="appointment_date">วันที่</Label>
              <AppointmentDatePicker
                value={appointmentForm.appointment_date}
                setValue={(value) =>
                  setAppointmentForm((prevState) => ({
                    ...prevState,
                    appointment_date: value,
                  }))
                }
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <Label htmlFor="appointment_time">เวลานัด</Label>
              <AppointmentTimeSelector
                defaultValue={appointmentForm.appointment_time}
                setValue={(value) =>
                  setAppointmentForm((prevState) => ({
                    ...prevState,
                    appointment_time: value,
                  }))
                }
              />
            </div>
            {isCreatingAppointment ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                กำลังสร้างการนัดหมาย...
              </Button>
            ) : (
              <ConfirmButton
                buttonTitle="สร้างการนัดหมาย"
                title="ยืนยันการสร้างการนัดหมาย"
                description="คุณแน่ใจหรือไม่ว่าต้องการสร้างการนัดหมายนี้?"
                cancelTitle="ยกเลิก"
                confirmTitle="ยืนยัน"
                onConfirm={handleConfirmCreateAppointment}
              />
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointmentDialog;
