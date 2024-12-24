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

// Generic InputField Component
const InputField: React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  errorMessage: string;
}> = ({ type, placeholder, value, onChange, invalid, errorMessage }) => (
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

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  errorMessage: string;
}

// Specific Field Wrappers
const FirstNameField = (
  props: Omit<InputFieldProps, "type" | "placeholder">
) => (
  <InputField
    type="text"
    placeholder="ชื่อ"
    {...props}
    errorMessage="กรุณากรอกเป็นภาษาไทย"
  />
);

const LastNameField = (
  props: Omit<InputFieldProps, "type" | "placeholder">
) => (
  <InputField
    type="text"
    placeholder="นามสกุล"
    {...props}
    errorMessage="กรุณากรอกเป็นภาษาไทย"
  />
);

const PhoneNumberField = (
  props: Omit<InputFieldProps, "type" | "placeholder">
) => (
  <InputField
    type="tel"
    placeholder="เบอร์โทรศัพท์"
    {...props}
    errorMessage="กรุณากรอกเป็นตัวเลขเท่านั้น"
  />
);

interface AppointmentDialogProps {
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

// AppointmentDialog Component
const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
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
  const [showErrors, setShowErrors] = useState(false);

  const validateField = (value: string) => value.trim() !== "";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-center w-full sm:w-[350px] md:w-[400px] lg:w-[480px] h-[200px] sm:h-[225px] md:h-[225px] lg:h-[255px] bg-amber-400 text-white hover:shadow-xl hover:scale-[1.05] transition-transform duration-200 rounded-2xl shadow-md">
          <div className="flex items-center">
            <ClipboardCheck className="icon-size w-24 h-24" strokeWidth={2} />
            <span className="mt-4 text-4xl font-medium">ตรวจสอบนัดหมาย</span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ตรวจสอบนัดหมาย</DialogTitle>
          <DialogDescription>
            กรุณากรอกข้อมูลด้านล่างเพื่อยืนยันการตรวจสอบนัดหมาย
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col space-y-4">
          <FirstNameField
            value={firstName}
            onChange={setFirstName}
            invalid={showErrors && invalidFirstName}
            errorMessage="กรุณากรอกเป็นภาษาไทย"
          />
          <LastNameField
            value={lastName}
            onChange={setLastName}
            invalid={showErrors && invalidLastName}
            errorMessage="กรุณากรอกเป็นภาษาไทย"
          />
          <PhoneNumberField
            value={phone}
            onChange={setPhone}
            invalid={showErrors && invalidPhone}
            errorMessage="กรุณากรอกเป็นตัวเลขเท่านั้น"
          />
          <button
            className="bg-pink-200 text-xl text-white rounded-lg p-2 hover:bg-pink-600 transition duration-200 w-[100px] ml-auto font-noto text-center font-normal"
            onClick={handleValidation}
          >
            ตรวจสอบ
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
