"use client";

import MobileDashboardLayout from "@/components/dashboard/mobile/MobileDashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

  // Statistics data
  const totalAppointments = 200;
  const totalPatients = 200;
  const totalDoctors = 5;

  // Pie chart data
  const pieData = [
    { name: "คนไข้ใหม่", value: 120 },
    { name: "คนไข้เก่า", value: 80 },
  ];
  const COLORS = ["#FB6F92", "#fbbf24"];

  // Bar chart data
  const barData = [
    { name: "จ", appointments: 10 },
    { name: "อ", appointments: 20 },
    { name: "พ", appointments: 15 },
    { name: "พฤ", appointments: 30 },
    { name: "ศ", appointments: 25 },
    { name: "ส", appointments: 10 },
    { name: "อา", appointments: 5 },
  ];

  return (
    <MobileDashboardLayout>
      {/* Header with back button */}
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
        <div className="grid grid-cols-3 gap-2">
          <Card>
            <CardHeader>
              <CardTitle>การนัดหมาย</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalAppointments}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>คนไข้</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalPatients}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>แพทย์</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalDoctors}</p>
            </CardContent>
          </Card>
        </div>

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
