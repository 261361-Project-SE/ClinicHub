import { postRequest } from "../services/api-p";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/(pages)/p/components/ui/dialog";
import axios from "axios";
import React, { useState, useEffect } from "react";

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
    errorMessage="กรุณากรอกเบอร์โทรศัพท์ 10 หลัก"
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
  onConfirm: () => void;
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
  onConfirm,
}) => {
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset showErrors when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setShowErrors(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

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
      isAllValid:
        isNameValid && isLastnameValid && isPhoneValid && isSymptomValid,
    };
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const validation = areAllFieldsValid();
    setShowErrors(true);

    if (!validation.isAllValid) {
      console.error("Validation errors present. Please correct the fields.");
      return;
    }

    setIsSubmitting(true);

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
      setShowErrors(false);
      onConfirm();
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setShowErrors(false);
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">จองการนัดหมาย</DialogTitle>
          <DialogDescription className="text-center">
            {message}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col space-y-4">
          <label className="block text-gray-600 font-noto font-medium text-lg">
            ชื่อ
          </label>
          <FirstNameField
            value={name}
            onChange={(value) => setName(value)}
            invalid={showErrors && !validateField(name)}
            errorMessage="กรุณากรอกเป็นภาษาไทย"
          />
          <label className="block text-gray-600 font-noto font-medium text-lg">
            นามสกุล
          </label>
          <LastNameField
            value={lastname}
            onChange={(value) => setLastname(value)}
            invalid={showErrors && !validateField(lastname)}
            errorMessage="กรุณากรอกเป็นภาษาไทย"
          />
          <label className="block text-gray-600 font-noto font-medium text-lg">
            เบอร์โทรศัพท์
          </label>
          <PhoneNumberField
            value={phone}
            onChange={(value) => setPhone(value)}
            invalid={showErrors && !/^[0-9]{10}$/.test(phone)}
            errorMessage="กรุณากรอกเบอร์โทรศัพท์ 10 หลัก"
          />
          <label className="block text-gray-600 font-noto font-medium text-lg">
            อาการ
          </label>
          <SymptomField
            value={symptom}
            onChange={(value) => setSymptom(value)}
            invalid={showErrors && !validateField(symptom)}
            errorMessage="กรุณากรอกอาการ"
          />
          <button
            className={`bg-pink-200 text-xl text-white rounded-lg p-2 hover:bg-pink-600 transition duration-200 w-full font-noto text-center font-normal ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังดำเนินการ..." : "จองการนัด"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
