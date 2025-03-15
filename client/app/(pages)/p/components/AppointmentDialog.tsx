import { validateName, validatePhone } from "../(utils)/validation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/(pages)/p/components/ui/dialog";
import { ClipboardCheck } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface AppointmentDialogProps {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  handleValidation: () => void;
}

const InputField: React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ type, placeholder, value, onChange }) => (
  <div className="flex flex-col">
    <input
      type={type}
      placeholder={placeholder}
      className="border rounded-md p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  handleValidation,
}) => {
  const [error, setError] = useState<string | null>(null);

  const createQueryString = () => {
    return `/p/checkbooking?${new URLSearchParams({
      phoneNumber: phone,
      firstname: firstName,
      lastname: lastName,
    }).toString()}`;
  };

  const handleSubmit = () => {
    handleValidation();
    if (!validateName(firstName)) {
      setError("กรุณากรอกชื่อที่ถูกต้อง");
      return;
    }
    if (!validateName(lastName)) {
      setError("กรุณากรอกนามสกุลที่ถูกต้อง");
      return;
    }
    if (!validatePhone(phone)) {
      setError("กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง");
      return;
    }

    const queryString = createQueryString();
    window.location.href = queryString;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center w-full sm:w-[350px] md:w-[400px] lg:w-[480px] h-[200px] sm:h-[225px] md:h-[225px] lg:h-[255px] bg-amber-400 text-white hover:shadow-xl hover:scale-[1.05] transition-transform duration-200 rounded-2xl shadow-md">
          <div className="flex items-center">
            <ClipboardCheck className="icon-size w-24 h-24" strokeWidth={2} />
            <span className="mt-4 md:text-4xl font-medium">ตรวจสอบนัดหมาย</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ตรวจสอบนัดหมาย</DialogTitle>
          <DialogDescription>
            กรุณากรอกข้อมูลด้านล่างเพื่อไปยังหน้าตรวจสอบนัดหมาย
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col space-y-4">
          <InputField
            type="text"
            placeholder="ชื่อ"
            value={firstName}
            onChange={setFirstName}
          />
          <InputField
            type="text"
            placeholder="นามสกุล"
            value={lastName}
            onChange={setLastName}
          />
          <InputField
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={setPhone}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            onClick={handleSubmit}
            className="bg-pink-200 text-md text-white rounded-lg px-4 py-2 hover:bg-pink-300 transition duration-200 w-[100px] ml-auto font-noto text-center font-normal"
          >
            ตรวจสอบ
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
