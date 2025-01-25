"use client";

import CheckingLayout from "./CheckLayout";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckBookingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<any[]>([]); // Store an array of booking data
  const [error, setError] = useState<string | null>(null); // Store error messages
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  // Extract parameters from the URL
  const firstName = searchParams.get("firstname"); // Changed from "firstName" to "firstname"
  const lastName = searchParams.get("lastname"); // Changed from "lastName" to "lastname"
  const phone = searchParams.get("phoneNumber"); // Changed from "phone" to "phoneNumber"

  useEffect(() => {
    // Only fetch if the necessary parameters are available
    if (firstName && lastName && phone) {
      const fetchBookingData = async () => {
        try {
          setLoading(true);
          setError(null);

          // Replace with the actual API URL
          const response = await fetch(
            `http://localhost:4444/patient/appointment?phoneNumber=${phone}&firstname=${firstName}&lastname=${lastName}`
          );
          const data = await response.json();

          // Check if the response is successful and data contains appointments
          if (
            response.ok &&
            data.appointments &&
            data.appointments.length > 0
          ) {
            setBookingData(data.appointments); // Set the entire list of appointments
          } else {
            setError("ไม่พบข้อมูลการนัดหมาย");
          }
        } catch (err) {
          setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
        } finally {
          setLoading(false);
        }
      };

      fetchBookingData();
    } else {
      setError("ข้อมูลไม่ครบถ้วน");
      setLoading(false);
    }
  }, [firstName, lastName, phone]);

  return (
    <CheckingLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">ตรวจสอบนัดหมาย</h1>

        {loading ? (
          <p className="text-blue-500">กำลังโหลดข้อมูล...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : bookingData.length > 0 ? (
          <div className="space-y-4">
            {bookingData.map((booking: any, index: number) => (
              <div key={index} className="border p-4 rounded-md">
                <p>
                  <strong>ชื่อ:</strong> {booking.firstname}
                </p>
                <p>
                  <strong>นามสกุล:</strong> {booking.lastname}
                </p>
                <p>
                  <strong>เบอร์โทรศัพท์:</strong> {booking.phone_number}
                </p>
                <p>
                  <strong>อาการ:</strong> {booking.symptom}
                </p>
                <p>
                  <strong>วันที่นัดหมาย:</strong>{" "}
                  {new Date(booking.appointment_dateTime).toLocaleString()}
                </p>
                <p>
                  <strong>สถานะนัดหมาย:</strong> {booking.appointment_status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500">ไม่พบข้อมูลการนัดหมาย</p>
        )}
      </div>
    </CheckingLayout>
  );
};

export default CheckBookingPage;
