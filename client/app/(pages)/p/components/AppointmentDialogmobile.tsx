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
import React, { useState } from "react";

interface AppointmentDialogMobileProps {
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
  onChange: React.Dispatch<React.SetStateAction<string>>;
}> = ({ type, placeholder, value, onChange }) => (
  <div className="flex flex-col">
    <input
      type={type}
      placeholder={placeholder}
      className="border rounded-md p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)} // ใช้ `onChange` จาก React State
    />
  </div>
);

const AppointmentDialogMobile: React.FC<AppointmentDialogMobileProps> = ({
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
      <div className="max-w-sm mx-auto p-4">
        <DialogTrigger asChild>
          <button className="w-[150px] h-[50px] bg-gray-100 text-gray-700 rounded-full hover:scale-105 transition-transform">
            <div className="font-noto font-medium text-sm">ตรวจสอบนัดหมาย</div>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">ตรวจสอบนัดหมาย</DialogTitle>
            <DialogDescription className="text-center">
              กรุณากรอกข้อมูลด้านล่างเพื่อยืนยันการตรวจสอบนัดหมาย
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleSubmit}
              className="bg-pink-200 text-md text-white rounded-lg px-4 py-2 hover:bg-pink-300 transition duration-200 w-full font-noto text-center font-normal"
            >
              ตรวจสอบ
            </button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default AppointmentDialogMobile;
