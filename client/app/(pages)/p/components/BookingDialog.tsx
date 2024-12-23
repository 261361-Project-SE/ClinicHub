import { postRequest } from "../services/api-p";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
      className={`border rounded-md p-2 ${invalid ? "border-red-500" : ""}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {invalid && <span className="text-red-500 text-sm">{errorMessage}</span>}
  </>
);

const validateField = (value: string) => value.trim() !== "";

const FirstNameField: React.FC<
  Omit<InputFieldProps, "type" | "placeholder">
> = (props) => {
  return (
    <InputField
      type="text"
      placeholder="ชื่อ"
      {...props}
      invalid={props.invalid}
      errorMessage={props.errorMessage}
    />
  );
};

const LastNameField: React.FC<Omit<InputFieldProps, "type" | "placeholder">> = (
  props
) => {
  return (
    <InputField
      type="text"
      placeholder="นามสกุล"
      {...props}
      invalid={props.invalid}
      errorMessage={props.errorMessage}
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
      invalid={invalid}
      errorMessage={errorMessage}
    />
  );
};

const SymptomField: React.FC<Omit<InputFieldProps, "type" | "placeholder">> = (
  props
) => {
  return (
    <InputField
      type="text"
      placeholder="อาการ"
      {...props}
      invalid={props.invalid}
      errorMessage={props.errorMessage}
    />
  );
};

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  invalidSymptom: boolean;
  appointment_dateTime: string;
  symptom: string;
  setSymptom: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  lastname: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setLastname: React.Dispatch<React.SetStateAction<string>>;
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  invalidName: boolean;
  invalidLastname: boolean;
  invalidPhone: boolean;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  name,
  lastname,
  setName,
  setLastname,
  phone,
  setPhone,
  invalidName,
  invalidLastname,
  invalidPhone,
  symptom,
  setSymptom,
  appointment_dateTime,
  invalidSymptom,
}) => {
  const [showErrors, setShowErrors] = useState(false);

  const validateAllFields = () => {
    const isNameValid = validateField(name);
    const isLastnameValid = validateField(lastname);
    const isPhoneValid = /^[0-9]{10}$/.test(phone); // Validates Thai phone numbers (10 digits)
    const isSymptomValid = validateField(symptom);

    return {
      isNameValid,
      isLastnameValid,
      isPhoneValid,
      isSymptomValid,
      hasErrors: !(
        isNameValid &&
        isLastnameValid &&
        isPhoneValid &&
        isSymptomValid
      ),
    };
  };

  const handleSubmit = async () => {
    const {
      isNameValid,
      isLastnameValid,
      isPhoneValid,
      isSymptomValid,
      hasErrors,
    } = validateAllFields();

    setShowErrors(true); // Show errors if any

    if (hasErrors) {
      console.error("Validation errors present. Please correct the fields.");
      return; // Prevent submission
    }

    const data = {
      firstname: name,
      lastname: lastname,
      phone_number: phone,
      symptom: symptom,
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error creating appointment:",
          error.message,
          error.response ? error.response.data : "No response data"
        );
        console.error("Request data:", data);
        console.error("Error status:", error.response?.status);
        console.error("Error headers:", error.response?.headers);
        console.error("Full error object:", error);
        if (error.response?.status === 500) {
          console.error("Server error: Please check the server logs.");
        } else if (error.response?.status === 401) {
          console.error("Unauthorized: Please check your credentials.");
        }
      } else {
        console.error("Error creating appointment:", error);
      }
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
              value={name}
              onChange={(value) => setName(value)}
              invalid={showErrors && !validateField(name)}
              errorMessage="กรุณากรอกเป็นภาษาไทย"
            />
            <LastNameField
              value={lastname}
              onChange={(value) => setLastname(value)}
              invalid={showErrors && !validateField(lastname)}
              errorMessage="กรุณากรอกเป็นภาษาไทย"
            />
            <PhoneNumberField
              value={phone}
              onChange={(value) => setPhone(value)}
              invalid={showErrors && !/^[0-9]{10}$/.test(phone)}
              errorMessage="กรุณากรอกเป็นตัวเลขเท่านั้น"
            />
            <SymptomField
              value={symptom}
              onChange={(value) => setSymptom(value)}
              invalid={showErrors && !validateField(symptom)}
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
      </div>
    </Dialog>
  );
};

export default BookingDialog;
