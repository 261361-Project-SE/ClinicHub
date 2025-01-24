import { validateName, validatePhone } from "../(utils)/validation";
import { getfilterpatient } from "../services/api-p";
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

const InputField: React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  errorMessage: string;
}> = ({ type, placeholder, value, onChange, invalid, errorMessage }) => (
  <div className="flex flex-col">
    <input
      type={type}
      placeholder={placeholder}
      className={`border rounded-md p-2 ${
        invalid ? "border-red-500" : "border-gray-300"
      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {invalid && <span className="text-red-500 text-sm">{errorMessage}</span>}
  </div>
);

const AppointmentDialog: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidFirstName, setInvalidFirstName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

  const errorMessageName = "กรุณากรอกเป็นภาษาไทย";
  const errorMessagePhone = "กรุณากรอกเป็นตัวเลขเท่านั้น";

  const handleNameChange = (
    value: string,
    setter: (val: string) => void,
    setInvalid: (val: boolean) => void
  ) => {
    setter(value);
    setInvalid(!validateName(value));
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setInvalidPhone(!validatePhone(value));
  };

  const handleValidation = async () => {
    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validatePhone(phone)
    ) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
      return;
    }

    try {
      // Call API to get appointments based on the input
      const fetchedAppointments = await getfilterpatient(
        phone,
        firstName,
        lastName
      );

      if (fetchedAppointments.length > 0) {
        setAppointments(fetchedAppointments);
      } else {
        setError("ไม่พบนัดหมายสำหรับข้อมูลที่ให้มา");
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการตรวจสอบนัดหมาย");
      console.error(error);
    }
  };

  // Determine whether the form is valid or not
  const isFormValid =
    validateName(firstName) && validateName(lastName) && validatePhone(phone);

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
          <InputField
            type="text"
            placeholder="ชื่อ"
            value={firstName}
            onChange={(value) =>
              handleNameChange(value, setFirstName, setInvalidFirstName)
            }
            invalid={invalidFirstName}
            errorMessage={errorMessageName}
          />
          <InputField
            type="text"
            placeholder="นามสกุล"
            value={lastName}
            onChange={(value) =>
              handleNameChange(value, setLastName, setInvalidLastName)
            }
            invalid={invalidLastName}
            errorMessage={errorMessageName}
          />
          <InputField
            type="tel"
            placeholder="เบอร์โทรศัพท์"
            value={phone}
            onChange={handlePhoneChange}
            invalid={invalidPhone}
            errorMessage={errorMessagePhone}
          />
          {error && <span className="text-red-500">{error}</span>}
          {/* Show the "ตรวจสอบ" button only if the form is valid */}
          <button
            onClick={handleValidation}
            disabled={!isFormValid}
            className={`bg-pink-200 text-md text-white rounded-lg px-4 py-2 hover:bg-pink-600 transition duration-200 w-[100px] ml-auto font-noto text-center font-normal ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            ตรวจสอบ
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
