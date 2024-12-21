import { sendContactInfo } from "../services/api-p";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/(pages)/p/components/ui/dialog";
import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  invalid: boolean;
  errorMessage: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  invalid,
  errorMessage,
}) => (
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

const FirstNameField: React.FC<
  Omit<InputFieldProps, "type" | "placeholder">
> = ({ value, onChange, invalid, errorMessage }) => {
  const isValid = value.trim() !== "";
  return (
    <InputField
      type="text"
      placeholder="ชื่อ"
      value={value}
      onChange={onChange}
      invalid={!isValid || invalid}
      errorMessage={!isValid ? "กรุณากรอกชื่อเป็นภาษาไทย" : errorMessage}
    />
  );
};

const LastNameField: React.FC<
  Omit<InputFieldProps, "type" | "placeholder">
> = ({ value, onChange, invalid, errorMessage }) => {
  const isValid = value.trim() !== "";
  return (
    <InputField
      type="text"
      placeholder="นามสกุล"
      value={value}
      onChange={onChange}
      invalid={!isValid || invalid}
      errorMessage={!isValid ? "กรุณากรอกนามสกุลเป็นภาษาไทย" : errorMessage}
    />
  );
};

const PhoneNumberField: React.FC<
  Omit<InputFieldProps, "type" | "placeholder">
> = ({ value, onChange, invalid, errorMessage }) => {
  const isValid = /^[0-9]{10}$/.test(value);
  return (
    <InputField
      type="tel"
      placeholder="เบอร์โทรศัพท์"
      value={value}
      onChange={onChange}
      invalid={!isValid || invalid}
      errorMessage={
        !isValid
          ? "กรุณากรอกเบอร์โทรศัพท์เป็นตัวเลข10หลักเท่านั้น"
          : errorMessage
      }
    />
  );
};

interface BookingDialogProps {
  name: string;
  lastname: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setLastname: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  invalidName: boolean;
  invalidLastname: boolean;
  invalidPhone: boolean;
  handleValidation: () => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  name,
  lastname,
  setName,
  setLastname,
  phone,
  setPhone,
  invalidName,
  invalidPhone,
  handleValidation,
}) => {
  const handleSubmit = async () => {
    const firstName = name;
    const lastName = lastname;
    try {
      await sendContactInfo(firstName, lastName, phone);
    } catch (error) {
      console.error(
        "Error creating appointment:",
        error instanceof Error ? error.message : error
      );
    }
  };

  return (
    <Dialog>
      <div className="max-w-sm mx-auto">
        <DialogTrigger asChild>
          <button className="bg-pink-200 text-white shadow-md w-[140px] md:w-[173px] h-[50px] rounded-full hover:scale-105 transition-transform">
            <span className="font-noto font-medium text-lg">จองการนัด</span>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">จองการนัดหมาย</DialogTitle>
            <DialogDescription className="text-center">
              กรุณากรอกข้อมูลด้านล่างเพื่อยืนยันการจองการนัด
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col space-y-4">
            <FirstNameField
              value={name.split(" ")[0] || ""}
              onChange={(value) =>
                setName(
                  value + (name.split(" ")[1] ? " " + name.split(" ")[1] : "")
                )
              }
              invalid={invalidName}
              errorMessage="กรุณากรอกเป็นภาษาไทย"
            />
            <LastNameField
              value={name.split(" ")[1] || ""}
              onChange={(value) =>
                setName((name.split(" ")[0] || "") + " " + value)
              }
              invalid={invalidName}
              errorMessage="กรุณากรอกเป็นภาษาไทย"
            />
            <PhoneNumberField
              value={phone}
              onChange={setPhone}
              invalid={invalidPhone}
              errorMessage="กรุณากรอกเป็นตัวเลขเท่านั้น"
            />
            <button
              className="bg-pink-200 text-xl text-white rounded-lg p-2 hover:bg-pink-600 transition duration-200 w-full font-noto text-center font-normal"
              onClick={handleSubmit}
            >
              ตรวจสอบ
            </button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default BookingDialog;
