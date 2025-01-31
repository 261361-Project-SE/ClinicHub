import { postRequest } from "../services/api-p";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/(pages)/p/components/ui/dialog";
import axios from "axios";
import React, { useState } from "react";

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
      className={`border rounded-md p-2 ${
        invalid ? "border-red-500 bg-red-100" : ""
      }`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {invalid && <span className="text-red-500 text-sm">{errorMessage}</span>}
  </>
);

const validateField = (value: string) => value.trim() !== "";

const FirstNameField: React.FC<
  Omit<InputFieldProps, "type" | "placeholder">
> = (props) => (
  <InputField
    type="text"
    placeholder="ชื่อ"
    {...props}
    errorMessage="กรุณากรอกเป็นภาษาไทย"
  />
);

const LastNameField: React.FC<Omit<InputFieldProps, "type" | "placeholder">> = (
  props
) => (
  <InputField
    type="text"
    placeholder="นามสกุล"
    {...props}
    errorMessage="กรุณากรอกเป็นภาษาไทย"
  />
);

const PhoneNumberField: React.FC<
  Omit<InputFieldProps, "type" | "placeholder">
> = ({ value, onChange, invalid, errorMessage }) => (
  <InputField
    type="tel"
    placeholder="เบอร์โทรศัพท์"
    value={value}
    onChange={onChange}
    invalid={invalid}
    errorMessage={errorMessage}
  />
);

const SymptomField: React.FC<Omit<InputFieldProps, "type" | "placeholder">> = (
  props
) => <InputField type="text" placeholder="อาการ" {...props} />;

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  name: string;
  lastname: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setLastname: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  symptom: string;
  setSymptom: React.Dispatch<React.SetStateAction<string>>;
  appointment_dateTime: string;
  invalidName: boolean;
  invalidLastname: boolean;
  invalidPhone: boolean;
  invalidSymptom: boolean;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  onClose,
  message,
  name,
  lastname,
  setName,
  setLastname,
  phone,
  setPhone,
  symptom,
  setSymptom,
  appointment_dateTime,
  invalidName,
  invalidLastname,
  invalidPhone,
  invalidSymptom,
}) => {
  const [showErrors, setShowErrors] = useState(false);
  const [showSuccessImage, setShowSuccessImage] = useState(false); // state สำหรับรูปภาพ

  const areAllFieldsValid = () => {
    const isNameValid = validateField(name);
    const isLastnameValid = validateField(lastname);
    const isPhoneValid = /^[0-9]{10}$/.test(phone);
    const isSymptomValid = validateField(symptom);

    return {
      isNameValid,
      isLastnameValid,
      isPhoneValid,
      isSymptomValid,
    };
  };

  const handleSubmit = async () => {
    const { isNameValid, isLastnameValid, isPhoneValid, isSymptomValid } =
      areAllFieldsValid();

    invalidName = !isNameValid ? true : false;
    invalidLastname = !isLastnameValid ? true : false;
    invalidPhone = !isPhoneValid ? true : false;
    invalidSymptom = !isSymptomValid ? true : false;

    setShowErrors(true);

    if (!(isNameValid && isLastnameValid && isPhoneValid && isSymptomValid)) {
      console.error("Validation errors present. Please correct the fields.");
      return;
    }

    setShowErrors(false);

    const data = {
      firstname: name,
      lastname,
      phone_number: phone,
      symptom,
      appointment_dateTime: appointment_dateTime.replace("Z", ""),
    };

    try {
      await postRequest(
        data.firstname,
        data.lastname,
        data.phone_number,
        data.symptom,
        data.appointment_dateTime
      );

      // แสดงรูปภาพสำเร็จ
      onClose();
      setShowSuccessImage(true);

      // เปลี่ยนหน้าใหม่หลังจาก 5 วินาที
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error creating appointment:",
          error.message,
          error.response?.data || "No response data"
        );
      } else {
        console.error("Error creating appointment:", error);
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">จองการนัดหมาย</DialogTitle>
            <DialogDescription className="text-center">
              กรุณากรอกข้อมูลด้านล่างเพื่อยืนยันการจองการนัด
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col space-y-4">
            {/* Fields */}
            <label className="block text-gray-600 font-noto font-medium text-lg">
              ชื่อ
            </label>
            <FirstNameField
              value={name}
              onChange={(value) => setName(value)}
              invalid={showErrors && invalidName}
              errorMessage="กรุณากรอกเป็นภาษาไทย"
            />
            <label className="block text-gray-600 font-noto font-medium text-lg">
              นามสกุล
            </label>
            <LastNameField
              value={lastname}
              onChange={(value) => setLastname(value)}
              invalid={showErrors && invalidLastname}
              errorMessage="กรุณากรอกเป็นภาษาไทย"
            />
            <label className="block text-gray-600 font-noto font-medium text-lg">
              เบอร์โทรศัพท์
            </label>
            <PhoneNumberField
              value={phone}
              onChange={(value) => setPhone(value)}
              invalid={showErrors && invalidPhone}
              errorMessage="กรุณากรอกเป็นตัวเลขเท่านั้น"
            />
            <label className="block text-gray-600 font-noto font-medium text-lg">
              อาการ
            </label>
            <SymptomField
              value={symptom}
              onChange={(value) => setSymptom(value)}
              invalid={showErrors && invalidSymptom}
              errorMessage="กรุณากรอกเป็นภาษาไทย"
            />
            <button
              className="bg-pink-200 text-xl text-white rounded-lg p-2 hover:bg-pink-600 transition duration-200 w-full font-noto text-center font-normal"
              onClick={handleSubmit}
            >
              จองการนัด
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Image */}
      {showSuccessImage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 flex flex-col items-center">
            <img src="/check.png" alt="Booking Success" className="w-32 h-32" />
            <p className="mt-4 text-lg font-bold text-green-500">
              การจองสำเร็จ!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingDialog;
