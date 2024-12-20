import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ClipboardCheck } from "lucide-react";
import React from "react";

interface AppointmentDialogProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  invalidName: boolean;
  invalidPhone: boolean;
  handleValidation: () => void;
}

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
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
      <DialogTrigger asChild>
        <button className="flex items-center justify-center w-full md:w-[400px] lg:w-[480px] h-[200px] md:h-[225px] lg:h-[255px] bg-amber-400 text-white hover:shadow-xl hover:scale-[1.05] transition-transform duration-200 rounded-2xl shadow-md">
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

export default AppointmentDialog;
