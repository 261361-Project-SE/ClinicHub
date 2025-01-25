import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { AppointmentDatePicker } from "@/components/dashboard/AppointmentDatePicker";
import { AppointmentTimeSelector } from "@/components/dashboard/AppointmentTimeSelector";
import { ConfirmButton } from "@/components/dashboard/ConfirmButton";
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
import { AppointmentProps } from "@/lib/types";

const CreateAppointmentDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<AppointmentProps>({
    firstname: "",
    lastname: "",
    phone_number: "",
    symptom: "",
    appointment_date: "",
    appointment_time: "",
    appointment_status: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleConfirm = () => {
    const { firstname, lastname, symptom, appointment_date, appointment_time } =
      formState;

    if (
      !firstname ||
      !lastname ||
      !appointment_date ||
      !appointment_time ||
      !symptom
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    const formattedTime = `${appointment_time.slice(
      0,
      2
    )}:${appointment_time.slice(2)}`;
    const dateTimeString = `${appointment_date}T${formattedTime}:00`;
    const timestamp = new Date(dateTimeString).toISOString();

    console.log("Form submitted with timestamp:", timestamp);
    console.log("Form data:", formState);

    // API call or further logic for appointment creation

    setFormState({
      firstname: "",
      lastname: "",
      phone_number: "",
      symptom: "",
      appointment_date: "",
      appointment_time: "",
      appointment_status: "",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center px-4 font-medium text-white bg-pink-200 hover:bg-pink-200/90 rounded-2xl h-14">
        <PlusIcon className="mr-1" />
        สร้างการนัดหมาย
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">สร้างการนัดหมาย</DialogTitle>
        </DialogHeader>
        <p id="dialog-description" className="mb-4 text-sm text-gray-500">
          กรุณากรอกรายละเอียดการนัดหมายให้ครบถ้วนก่อนกดยืนยัน
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirm();
          }}
        >
          <div className="flex flex-col mt-4 gap-y-4 text-darkgray">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="firstname">ชื่อคนไข้</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  id="firstname"
                  placeholder="ชื่อ"
                  value={formState.firstname}
                  onChange={handleInputChange}
                />
                <Input
                  type="text"
                  id="lastname"
                  placeholder="นามสกุล"
                  value={formState.lastname}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="symptom">บันทึกย่อ</Label>
              <Textarea
                placeholder="คนไข้ไม่สบายตัว ปวดหัว"
                id="symptom"
                value={formState.symptom}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="appointment_date">วันที่</Label>
              <AppointmentDatePicker
                value={formState.appointment_date}
                setValue={(value) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    appointment_date: value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="appointment_time">เวลานัด</Label>
              <AppointmentTimeSelector
                appointment_time={formState.appointment_time}
                setValue={(value) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    appointment_time: value,
                  }))
                }
              />
            </div>
            <ConfirmButton
              buttonTitle="สร้างการนัดหมาย"
              title="สร้างการนัดหมาย"
              description="คุณแน่ใจหรือไม่ว่าต้องการสร้างการนัดหมายนี้"
              cancelTitle="ยกเลิก"
              confirmTitle="สร้างการนัดหมาย"
              handleConfirm={handleConfirm}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppointmentDialog;
