import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/(pages)/p/components/ui/dialog";
import React from "react";

interface AppointmentDialogMobileProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  invalidName: boolean;
  invalidPhone: boolean;
  handleValidation: () => void;
}

const AppointmentDialogmobile: React.FC<AppointmentDialogMobileProps> = ({
  name,
  setName,
  phone,
  setPhone,
  invalidName,
  invalidPhone,
  handleValidation,
}) => {
  return (
    <Dialog>
      <div className="max-w-sm mx-auto p-4">
        <DialogTrigger asChild>
          <button className="w-full h-[50px] bg-gray-100 text-gray-700 rounded-lg hover:scale-105 transition-transform">
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
              placeholder="ชื่อ - นามสกุล"
              value={name}
              onChange={setName}
              invalid={invalidName}
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
            <button
              className="bg-pink-200 text-xl text-white rounded-lg p-2 hover:bg-pink-600 transition duration-200 w-full font-noto text-center font-normal"
              onClick={handleValidation}
            >
              ตรวจสอบ
            </button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

const InputField: React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  errorMessage: string;
}> = ({ type, placeholder, value, onChange, invalid, errorMessage }) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      className={`border rounded-md p-2 ${invalid ? "border-red-500" : ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {invalid && <span className="text-red-500 text-sm">{errorMessage}</span>}
  </>
);

export default AppointmentDialogmobile;
