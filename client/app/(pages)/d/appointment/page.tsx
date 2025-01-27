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

const ITEMS_PER_PAGE = 5;

const AppointmentsPage = () => {
  const {
    appointments = [],
    loading,
    error,
  } = useFetchAppointments() || {
    appointments: [],
    loading: false,
    error: null,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("upcoming");

  // Filtered and Sorted Appointments
  const filteredAppointments = (appointments || [])
    .filter((appointment) => {
      const appointmentDate = new Date(appointment.appointment_dateTime);
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(tomorrow.getDate() + 1);

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
              AppointmentStatus.CONFIRMED.value &&
            appointmentDate >= tomorrow &&
            appointmentDate < dayAfterTomorrow
          );
        case "history":
          return (
            appointmentDate < now &&
            appointment.appointment_status !== AppointmentStatus.CANCELED.value
          );
        case "canceled":
          return (
            appointment.appointment_status === AppointmentStatus.CANCELED.value
          );
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (filter === "history") {
        return (
          new Date(b.appointment_dateTime).getTime() -
          new Date(a.appointment_dateTime).getTime()
        );
      }
      return (
        new Date(a.appointment_dateTime).getTime() -
        new Date(b.appointment_dateTime).getTime()
      );
    });

  // Grouped by Month and Paginated
  const groupedAppointments = filteredAppointments.reduce(
    (acc, appointment) => {
      const date = new Date(appointment.appointment_dateTime);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(appointment);
      return acc;
    },
    {} as Record<string, typeof appointments>
  );

  const monthKeys = Object.keys(groupedAppointments);
  const totalPages = Math.ceil(monthKeys.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedKeys = monthKeys.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  if (loading)
    return (
      <>
        <div className="flex flex-col h-full p-6 bg-white space-y-4 rounded-xl shadow-shadow-bg">
          <div className="sticky top-0 z-10 bg-white space-y-4">
            <CreateAppointmentDialog />
            <AppointmentFilterTab onFilterChange={handleFilterChange} />
          </div>
          <Skeleton className="py-1 h-24 rounded-xl" />
          <Skeleton className="py-1 h-24 rounded-xl" />
          <Skeleton className="py-1 h-24 rounded-xl" />
        </div>
      </>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col h-full p-6 bg-white space-y-4 rounded-xl shadow-shadow-bg">
      <div className="sticky top-0 z-10 bg-white space-y-4">
        <CreateAppointmentDialog />
        <AppointmentFilterTab onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {!monthKeys.length ? (
          <div className="py-8 text-center text-gray-500">
            ไม่พบการนัดหมายสำหรับหมวดหมู่นี้
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {paginatedKeys.map((key) => {
                const [year, month] = key.split("-");
                const appointments = groupedAppointments[key];
                return (
                  <div key={key} className="space-y-2">
                    <div className="mb-4 text-lg font-medium text-darkgray">
                      {new Date(Number(year), Number(month) - 1).toLocaleString(
                        "th-TH",
                        {
                          year: "numeric",
                          month: "long",
                        }
                      )}
                    </div>
                    <div className="space-y-4">
                      {appointments?.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          {...appointment}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

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
                          currentPage <= 1
                            ? "pointer-events-none opacity-50"
                            : ""
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
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPage;
