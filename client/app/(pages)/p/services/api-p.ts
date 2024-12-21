import { postRequest } from "@/service/api";

export const sendContactInfo = async (
  firstName: string,
  lastName: string,
  phone: string
) => {
  const data = {
    firstname: firstName,
    lastname: lastName,
    phone_number: phone,
  };
  try {
    const response = await postRequest("/appointment/create", data);
    return response;
  } catch (error) {
    console.error("Error sending contact info:", error);
    throw new Error("Failed to send contact info. Please try again later.");
  }
};
