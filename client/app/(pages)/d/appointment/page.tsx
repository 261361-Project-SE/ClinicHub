"use client";

import { AppointmentFilterTab } from "@/components/dashboard/AppointmentFilterTab";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { appointmentsData } from "@/helper/SampleData";
import React, { useState } from "react";

const ITEMS_PER_PAGE = 7;

const AppointmentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("upcoming");

  const totalPages = Math.ceil(appointmentsData.length / ITEMS_PER_PAGE);

  const filteredAppointments = appointmentsData.filter((appointment) => {
    if (filter === "upcoming") {
      return new Date(appointment.appointment_dateTime) > new Date();
    }
    if (filter === "cancelled") {
      return appointment.appointment_status === "cancelled";
    }
    return true;
  });

  const currentData = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 bg-white space-y-4 rounded-xl shadow-shadow-bg">
      <AppointmentFilterTab onFilterChange={handleFilterChange} />
      <div className="space-y-4">
        {currentData.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 border rounded-xl"
          >
            <div>
              <p className="text-sm font-medium">
                {appointment.appointment_dateTime}
              </p>
              <p className="text-sm text-gray-500">
                {appointment.firstname} {appointment.lastname}
              </p>
            </div>
            <div className="text-sm">{appointment.appointment_dateTime}</div>
            <button className="px-3 py-1 ml-4 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">
              ยกเลิก
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AppointmentsPage;
