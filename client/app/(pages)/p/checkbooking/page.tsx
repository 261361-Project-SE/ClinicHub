import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CheckBookingPage: React.FC = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (router.query.appointments) {
      setAppointments(JSON.parse(router.query.appointments as string));
    }
  }, [router.query]);

  return (
    <div>
      <h1>Check Booking</h1>
      {appointments.length > 0 ? (
        <pre>{JSON.stringify(appointments, null, 2)}</pre>
      ) : (
        <p>ไม่พบนัดหมาย</p>
      )}
    </div>
  );
};

export default CheckBookingPage;
