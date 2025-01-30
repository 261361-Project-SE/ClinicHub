"use client";

import AppointmentCard from "@/components/dashboard/AppointmentCard";
import { AppointmentFilterTab } from "@/components/dashboard/AppointmentFilterTab";
import CreateAppointmentDialog from "@/components/dashboard/CreateAppointmentDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchAppointments } from "@/hooks/useFetchAppointments";
import { AppointmentStatus } from "@/lib/variables";
import React, { useState, useEffect } from "react";

interface FilterChangeHandler {
  (newFilter: string): void;
}

const ITEMS_PER_PAGE = 5;

const AppointmentsPage = () => {
  const { appointments, loading, error } = useFetchAppointments();

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("upcoming");

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredAppointments = React.useMemo(() => {
    if (!appointments) return [];

    return appointments
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.appointment_dateTime);
        const now = new Date();

        switch (filter) {
          case "upcoming":
            return (
              appointment.appointment_status ===
                AppointmentStatus.CONFIRMED.value && appointmentDate >= now
            );
          case "pending":
            return (
              appointment.appointment_status ===
                AppointmentStatus.PENDING.value && appointmentDate >= now
            );
          case "toConfirm":
            return (
              appointment.appointment_status ===
              AppointmentStatus.CONFIRMED.value
            );
          case "history":
            return (
              appointmentDate < now &&
              appointment.appointment_status !==
                AppointmentStatus.CANCELED.value
            );
          case "canceled":
            return (
              appointment.appointment_status ===
              AppointmentStatus.CANCELED.value
            );
          default:
            return true;
        }
      })
      .sort(
        (a, b) =>
          new Date(a.appointment_dateTime).getTime() -
          new Date(b.appointment_dateTime).getTime()
      );
  }, [appointments, filter]);

  const totalPages = Math.ceil(filteredAppointments.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange: FilterChangeHandler = (newFilter) => {
    setFilter(newFilter);
  };

  if (loading)
    return (
      <div className="flex flex-col h-full p-6 bg-white space-y-4 rounded-xl shadow-shadow-bg">
        <div className="sticky top-0 z-10 bg-white space-y-4">
          <CreateAppointmentDialog />
          <AppointmentFilterTab onFilterChange={handleFilterChange} />
        </div>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 py-1 rounded-xl" />
        ))}
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col h-full p-6 bg-white space-y-4 rounded-xl shadow-shadow-bg">
      <div className="sticky top-0 z-10 bg-white space-y-4">
        <CreateAppointmentDialog />
        <AppointmentFilterTab onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {paginatedAppointments.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            ไม่พบการนัดหมายสำหรับหมวดหมู่นี้
          </div>
        ) : (
          paginatedAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} {...appointment} />
          ))
        )}

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(index + 1);
                      }}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
