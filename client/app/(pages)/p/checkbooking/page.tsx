"use client";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import CheckingLayout from "./CheckLayout";
import SearchAppointments from "@/app/(pages)/p/components/SearchAppointments";
import { Card, CardContent } from "@/app/(pages)/p/components/ui/card";
import { Appointment } from "@/app/(pages)/p/types/appointment";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckBookingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<Appointment[]>([]);
  const [filteredData, setFilteredData] = useState<Appointment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const firstName = searchParams.get("firstname");
  const lastName = searchParams.get("lastname");
  const phone = searchParams.get("phoneNumber");

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `http://localhost:5000/patient/appointment?phoneNumber=${phone}&firstname=${firstName}&lastname=${lastName}`
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

  const cancelAppointment = async (appointment: Appointment) => {
    const appointmentDate = new Date(appointment.appointment_dateTime);
    const now = new Date();
    const timeDiff = appointmentDate.getTime() - now.getTime();
    const diffDays = timeDiff / (1000 * 3600 * 24); // Convert time diff to days

    if (diffDays <= 1) {
      setCancelError("ไม่สามารถยกเลิกการนัดหมายได้");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/appointment/cancel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: appointment.id }),
      });

      if (response.ok) {
        const updatedData = bookingData.filter(
          (item) => item.id !== appointment.id
        );
        setBookingData(updatedData);
        setFilteredData(updatedData);
      } else {
        setCancelError("ไม่สามารถยกเลิกการนัดหมายได้");
      }
    } catch (err) {
      setCancelError("เกิดข้อผิดพลาดในการยกเลิกการนัดหมาย");
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
      {cancelError && (
        <Alert className="mb-2 bg-white text-red-500 border border-red-500 font-noto font-semibold">
          <AlertTitle>ไม่สามารถยกเลิกการนัดหมายได้</AlertTitle>
          <AlertDescription>
            กรุณาติดต่อเจ้าหน้าที่เพื่อยกเลิกการนัดหมาย
          </AlertDescription>
        </Alert>
      )}
      <div className="bg-gray-50 rounded-xl shadow-xl md:h-[700px] md:w-[1440px] md:mx-auto md:max-w-screen-xl md:p-6">
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
                          className="text-white bg-red-500 rounded-lg px-4 py-2 mt-4"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowCancelDialog(true);
                          }}
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

                        <button
                          className="text-white bg-red-500 rounded-lg px-4 py-2 mt-4"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowCancelDialog(true);
                          }}
                        >
                          ยกเลิกนัดหมาย
                        </button>
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
      <div className="mt-6 flex flex-col md:items-end itgiems-center">
        <div className="flex gap-6">
          <Link href="/">
            <button className="bg-gray-300 text-black hover:opacity-80 shadow-md w-[140px] md:w-[173px] h-[50px] rounded-full">
              กลับหน้าหลัก
            </button>
          </Link>
        </div>
      </div>
      {showCancelDialog && selectedAppointment && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">ยืนยันการยกเลิก</h2>
            <p>คุณต้องการยกเลิกการนัดหมายนี้หรือไม่?</p>
            <div className="mt-4 flex justify-between">
              <button
                className="text-white bg-gray-500 rounded-lg px-4 py-2"
                onClick={() => setShowCancelDialog(false)}
              >
                ยกเลิก
              </button>
              <button
                className="text-white bg-red-500 rounded-lg px-4 py-2"
                onClick={() => cancelAppointment(selectedAppointment)}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </CheckingLayout>
  );
};

export default CheckBookingPage;
