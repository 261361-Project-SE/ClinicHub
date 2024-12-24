import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/(pages)/p/components/ui/dialog";
import React, { useState } from "react";

interface AppointmentDialogMobileProps {
  firstName: string;
  setFirstName: (name: string) => void;
  lastName: string;
  setLastName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  invalidFirstName: boolean;
  invalidLastName: boolean;
  invalidPhone: boolean;
  handleValidation: () => void;
}

const AppointmentDialogmobile: React.FC<AppointmentDialogMobileProps> = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  invalidFirstName,
  invalidLastName,
  invalidPhone,
  handleValidation,
}) => {
  const [isInvalidFirstName, setIsInvalidFirstName] =
    useState(invalidFirstName);
  const [isInvalidLastName, setIsInvalidLastName] = useState(invalidLastName);
  const [isInvalidPhone, setIsInvalidPhone] = useState(invalidPhone);
  const [errorMessage, setErrorMessage] = useState("");

  const validateField = (value: string) => value.trim() !== "";

  const handleCheck = async () => {
    const firstNameValid = validateField(firstName);
    const lastNameValid = validateField(lastName);
    const phoneValid = /^[0-9]{10}$/.test(phone);

    setIsInvalidFirstName(!firstNameValid);
    setIsInvalidLastName(!lastNameValid);
    setIsInvalidPhone(!phoneValid);

    if (firstNameValid && lastNameValid && phoneValid) {
      try {
        const response = await fetch(
          `${process.env.API_END_POINT}/appointment?firstName=${firstName}&lastName=${lastName}&phone=${phone}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointment data.");
        }

        const data = await response.json();
        console.log(data);
        handleValidation();
      } catch (error) {
        setErrorMessage(
          "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง"
        );
        console.error("Error fetching appointment data:", error);
      }
    }
  };

  return (
    <Dialog>
      <div className="max-w-sm mx-auto p-4">
        <DialogTrigger asChild>
          <button className="w-full h-[50px] bg-gray-100 text-gray-700 rounded-full hover:scale-105 transition-transform">
            <span className="font-noto font-medium text-lg">
              ตรวจสอบนัดหมาย
            </span>
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
              invalid={invalidFirstName}
              errorMessage="กรุณากรอกเป็นภาษาไทย"
            />
            <InputField
              type="text"
              placeholder="นามสกุล"
              value={lastName}
              onChange={setLastName}
              invalid={invalidLastName}
              errorMessage="กรุณากรอกเป็นภาษาไทย"
            />
            <InputField
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              value={phone}
              onChange={setPhone}
              invalid={invalidPhone}
              errorMessage="กรุณากรอกเป็นตัวเลขเท่านั้น"
            />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              className="bg-pink-200 text-xl text-white rounded-lg p-2 hover:bg-pink-600 transition duration-200 w-full font-noto text-center font-normal"
              onClick={handleCheck}
            >
              ตรวจสอบ
            </button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  invalid,
  errorMessage,
}) => (
  <div>
    <input
      type={type}
      placeholder={placeholder}
      className={`border rounded-md p-2 w-full ${
        invalid ? "border-red-500 bg-red-100" : ""
      }`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {invalid && <span className="text-red-500 text-sm">{errorMessage}</span>}
  </div>
);

export default AppointmentDialogmobile;
