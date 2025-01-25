"use client";

import CheckingLayout from "./CheckLayout";
import SearchAppointments from "@/app/(pages)/p/components/SearchAppointments";
import { Card, CardContent } from "@/app/(pages)/p/components/ui/card";
import { Appointment } from "@/app/(pages)/p/types/appointment";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckBookingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<Appointment[]>([]);
  const [filteredData, setFilteredData] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const firstName = searchParams.get("firstname");
  const lastName = searchParams.get("lastname");
  const phone = searchParams.get("phoneNumber");

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:4444/patient/appointment?phoneNumber=${phone}&firstname=${firstName}&lastname=${lastName}`
        );
        const data = await response.json();

        if (response.ok && data.appointments && data.appointments.length > 0) {
          setBookingData(data.appointments);
          setFilteredData(data.appointments);
        } else {
          setError("ไม่พบข้อมูลการนัดหมาย");
        }
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    if (firstName && lastName && phone) {
      fetchBookingData();
    } else {
      setError("ข้อมูลไม่ครบถ้วน");
      setLoading(false);
    }
  }, [firstName, lastName, phone]);

  const updateAppointment = async (
    id: number,
    updatedData: Partial<Appointment>
  ) => {
    try {
      const response = await fetch(
        "http://localhost:4444/patient/appointment/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            ...updatedData,
          }),
        }
      );

      if (response.ok) {
        const updatedAppointment = await response.json();
        const updatedBookingData = bookingData.map((appointment) =>
          appointment.id === id ? updatedAppointment : appointment
        );
        setBookingData(updatedBookingData);

        // Update filtered data with the newly updated status
        const updatedFilteredData = updatedBookingData.filter(
          (appointment) =>
            appointment.appointment_status !== "CANCELED" &&
            new Date(appointment.appointment_dateTime) > new Date()
        );
        setFilteredData(updatedFilteredData);
      } else {
        setError("ไม่สามารถอัพเดตการนัดหมายได้");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการอัพเดตการนัดหมาย");
    }
  };

  const now = new Date();

  // Filter and sort appointments: Only confirmed ones, future appointments, and sorted by closest date
  const upcomingAppointments = filteredData
    .filter(
      (appointment) =>
        appointment.appointment_status === "CONFIRMED" && // Only confirmed appointments
        new Date(appointment.appointment_dateTime) > now // Future appointments
    )
    .sort(
      (a, b) =>
        new Date(a.appointment_dateTime).getTime() -
        new Date(b.appointment_dateTime).getTime() // Sort by appointment date (ascending)
    );

  const pastAppointments = filteredData.filter(
    (appointment) =>
      new Date(appointment.appointment_dateTime) <= now &&
      appointment.appointment_status !== "CANCELED"
  );

  const handleSearch = (filteredAppointments: Appointment[]) => {
    setFilteredData(filteredAppointments);
  };

  return (
    <CheckingLayout>
      <div className="bg-gray-50 rounded-xl shadow-xl md:h-[760px] md:w-[1440px] md:mx-auto md:max-w-screen-xl md:p-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8 text-right">นัดหมายทั้งหมด</h1>
          <SearchAppointments
            appointments={bookingData}
            onSearch={handleSearch}
          />
          {loading ? (
            <p className="text-blue-500">กำลังโหลดข้อมูล...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-2">
                  นัดหมายที่กำลังจะมาถึง
                </h2>
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((appointment, index) => (
                    <Card
                      key={index}
                      className="p-4 bg-pink-100 rounded-lg shadow-sm"
                    >
                      <CardContent>
                        <p className="font-semibold text-lg">
                          ชื่อ: {appointment.firstname}
                        </p>
                        <p className="text-sm">
                          วันที่:{" "}
                          {new Date(
                            appointment.appointment_dateTime
                          ).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm">
                          เวลา:{" "}
                          {new Date(
                            appointment.appointment_dateTime
                          ).toLocaleTimeString("th-TH")}
                        </p>
                        <button
                          className="text-blue-500"
                          onClick={() =>
                            updateAppointment(appointment.id, {
                              appointment_status: "CANCELED",
                            })
                          }
                        >
                          ยกเลิกนัดหมาย
                        </button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-500">ไม่มีนัดหมายที่กำลังจะมาถึง</p>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 text-right">
                  ประวัติการนัด
                </h2>
                {pastAppointments.length > 0 ? (
                  pastAppointments.map((appointment, index) => (
                    <Card
                      key={index}
                      className={`p-4 rounded-lg shadow-sm ${
                        appointment.appointment_status === "CANCELED"
                          ? "bg-red-100"
                          : "bg-white-200"
                      }`}
                    >
                      <CardContent>
                        <p className="text-2xl font-semibold text-black pb-2">
                          วันที่ :{" "}
                          {new Date(
                            appointment.appointment_dateTime
                          ).toLocaleDateString("th-TH", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-xl font-semibold text-black pb-2">
                          เวลา :{" "}
                          {new Date(
                            appointment.appointment_dateTime
                          ).toLocaleTimeString("th-TH")}
                        </p>
                        <p className="text-md font-semibold text-black pb-2">
                          สถานะ :{" "}
                          <span
                            className={`${
                              appointment.appointment_status === "CANCELED"
                                ? "text-red-500"
                                : "text-green-500"
                            } font-semibold`}
                          >
                            {appointment.appointment_status}
                          </span>
                        </p>
                        {appointment.appointment_status === "CANCELED" && (
                          <div className="mt-2 w-full bg-red-500 text-white text-center py-1 rounded-lg shadow-md">
                            ยกเลิกแล้ว
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-500">ไม่มีประวัติการนัดหมาย</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </CheckingLayout>
  );
};

export default CheckBookingPage;
