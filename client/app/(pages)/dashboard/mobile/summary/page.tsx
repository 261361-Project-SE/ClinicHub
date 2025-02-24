"use client";

import Error from "@/app/error";
import PageLoader from "@/components/PageLoader";
import MobileDashboardLayout from "@/components/dashboard/mobile/MobileDashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useFetchAppointments } from "@/hooks/useFetchAppointments";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { th } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MobileSummaryPage = () => {
  const router = useRouter();

  const { appointments, loading, error } = useFetchAppointments();
  const totalPatients = new Set(
    appointments.map((appointment) => appointment.phone_number)
  ).size;

  // Statistics data
  const totalAppointments = appointments.length;
  const totalDoctors = 3;

  const currentMonth = new Date();
  const lastMonth = new Date(currentMonth);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const getCurrentMonthPatients = () => {
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);

    return new Set(
      appointments
        .filter((apt) => {
          const aptDate = new Date(apt.appointment_dateTime);
          return aptDate >= startDate && aptDate <= endDate;
        })
        .map((apt) => apt.phone_number)
    );
  };

  const getLastMonthPatients = () => {
    const startDate = startOfMonth(lastMonth);
    const endDate = endOfMonth(lastMonth);

    return new Set(
      appointments
        .filter((apt) => {
          const aptDate = new Date(apt.appointment_dateTime);
          return aptDate >= startDate && aptDate <= endDate;
        })
        .map((apt) => apt.phone_number)
    );
  };

  const currentMonthPatients = getCurrentMonthPatients();
  const lastMonthPatients = getLastMonthPatients();

  const newPatients = Array.from(currentMonthPatients).filter(
    (phone) => !lastMonthPatients.has(phone)
  ).length;
  const returningPatients = currentMonthPatients.size - newPatients;

  const pieData = [
    { name: "คนไข้ใหม่", value: newPatients },
    { name: "คนไข้เก่า", value: returningPatients },
  ];

  const COLORS = ["#FB6F92", "#fbbf24"];

  const getWeeklyAppointments = () => {
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
    const endDate = endOfWeek(new Date(), { weekStartsOn: 1 });

    const daysInWeek = eachDayOfInterval({ start: startDate, end: endDate });

    return daysInWeek.map((day) => {
      const dayAppointments = appointments.filter((apt) => {
        const aptDate = new Date(apt.appointment_dateTime);
        return format(aptDate, "yyyy-MM-dd") === format(day, "yyyy-MM-dd");
      });

      return {
        name: format(day, "EEE", { locale: th }).slice(0, 2),
        appointments: dayAppointments.length,
        date: format(day, "dd/MM"),
      };
    });
  };

  const barData = getWeeklyAppointments();

  if (loading) return <PageLoader />;
  if (error) return <Error />;

  return (
    <MobileDashboardLayout>
      <div className="fixed top-0 z-50 w-full px-4 py-6 bg-white">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => router.back()}
            className="absolute left-0 text-gray-700"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-medium">สรุปผลทั้งหมด</h2>
        </div>
      </div>

      {/* Content */}
      <div className="mt-[80px] px-4 py-4 flex flex-col gap-4">
        {/* Statistics cards */}
        <Card>
          <CardContent className="flex flex-col p-6 gap-y-4">
            <div>
              <p className="text-sm text-muted-foreground">การนัดหมายทั้งหมด</p>
              <p className="text-2xl font-bold">{totalAppointments}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">คนไข้ทั้งหมด</p>
              <p className="text-2xl font-bold">{totalPatients}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">แพทย์ทั้งหมด</p>
              <p className="text-2xl font-bold">{totalDoctors}</p>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle>สรุปจำนวนคนไข้ ธันวาคม 2567</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart Card */}
        <Card>
          <CardHeader>
            <CardTitle>สรุปจำนวนคนไข้ นัดหมาย</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="appointments"
                  fill="#FB6F92"
                  name="จำนวนการนัดหมาย"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </MobileDashboardLayout>
  );
};

export default MobileSummaryPage;
