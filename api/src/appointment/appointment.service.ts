import { PrismaClient, Status } from "@prisma/client";
import { calendarService } from "../calendar/calendar.service";


class AppointmentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // ME
  async creteBooking(firstname: string, lastname: string, phone_number: string, symptom: string, appointment_dateTime: string) {
    try {

      const checkBooking = await this.prisma.appointments.findMany({
        where: {
          appointment_dateTime: appointment_dateTime,
          NOT: {
            appointment_status: Status.CANCELED,
          },
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (checkBooking.length > 0) {
        return { error: "Time slot already taken", status: 400 };
      }

      const dateTime = new Date(appointment_dateTime);
      const response = await calendarService.createEvent({
        year: dateTime.getFullYear(),
        month: dateTime.getMonth() + 1,
        day: dateTime.getDate(),
        hour: dateTime.getHours(),
        minute: dateTime.getMinutes(),
        description: symptom || "No description",
      });

      const booking = await this.prisma.appointments.create({
        data: {
          eventId: response.eventID || "",
          firstname: firstname,
          lastname: lastname,
          phone_number: phone_number,
          symptom: symptom,
          appointment_dateTime: appointment_dateTime,
          appointment_status: Status.PENDING,
        },
      });

      const updateBooking = {
        id: booking.id,
        firstname: booking.firstname,
        lastname: booking.lastname,
        phone_number: booking.phone_number,
        symptom: booking.symptom,
        appointment_dateTime: booking.appointment_dateTime,
        appointment_status: Status[booking.appointment_status] as string
      }
      return { ...updateBooking };
    } catch (error) {
      if (error instanceof Error && error.message === "Time slot is busy.") {
        return { error: "Time slot is busy.", status: 400 };
      }
      return { error: "Error while creating appointment service: " + error, status: 500 };
    }
  }

  async getDoctorAppointmentAll() {
    try {
      const appointments = await this.prisma.appointments.findMany({
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (appointments.length === 0) {
        return { error: "No appointment found.", status: 404 };
      }

      return appointments;
    } catch (error) {
      return { error: "Error while fetching all doctor appointment service: " + error, status: 500 };
    }
  }

  async getDoctorAppointmentByParameter(date: string, firstname: string, lastname: string, status: string, phone_number: string) {
    try {
      const status_prisma = status ? Status[status.toUpperCase() as keyof typeof Status] : '';
      const appointments = await this.prisma.appointments.findMany({
        where: {
          appointment_dateTime: {
            contains: date || '',
          },
          firstname: {
            contains: firstname || '',
          },
          lastname: {
            contains: lastname || '',
          },
          ...(status_prisma && { appointment_status: status_prisma }),
          phone_number: {
            contains: phone_number || '',
          }
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (appointments.length === 0) {
        return { error: "No appointment found.", status: 404 };
      }

      return appointments;

    } catch (error) {
      return { error: "Error while fetching doctor appointment by parameters service: " + error, status: 500 };
    }
  }

  // Not used. Now change to getDoctorAppointmentByParameter
  // async getDoctorAppointmentName(firstname: string, lastname: string) {
  //   try {
  //     const appointments = await this.prisma.appointments.findMany({
  //       where: {
  //         firstname: firstname,
  //         lastname: lastname,
  //       },
  //       orderBy: {
  //         appointment_dateTime: "asc",
  //       },
  //     });
  //     if (appointments.length === 0) {
  //       return "No appointment found";
  //     }
  //     return appointments;
  //   } catch (error) {
  //     throw new Error(
  //       "Error while fetching doctor appointment by patient name"
  //     );
  //   }
  // }

  // async getDoctorAppointmentStatus(status: string) {
  //   try {
  //     const status_prisma = Status[status as keyof typeof Status];
  //     const appointments = await this.prisma.appointments.findMany({
  //       where: {
  //         status: status_prisma,
  //       },
  //       orderBy: {
  //         appointment_dateTime: "asc",
  //       },
  //     });
  //     if (appointments.length === 0) {
  //       return "No appointment found";
  //     }
  //     return appointments;
  //   } catch (error) {
  //     throw new Error("Error while fetching doctor appointment by status");
  //   }
  // }

  // async getDoctorAppointmentPhoneNumber(phone: string) {
  //   try {
  //     const appointments = await this.prisma.appointments.findMany({
  //       where: {
  //         phone_number: phone,
  //       },
  //     });
  //     if (appointments.length === 0) {
  //       return "No appointment found";
  //     }
  //     return appointments;
  //   } catch (error) {
  //     throw new Error(
  //       "Error while fetching doctor appointment by phone number"
  //     );
  //   }
  // }


  //fix
  //ME
  async updateDoctorAppointment(id: number, appointment_dateTime: string, status: string) {
    try {
      // ตรวจสอบว่ามีการจองอยู่หรือไม่
      const checkBooking = await this.prisma.appointments.findUnique({
        where: {
          id: id,
        },
      });

      if (!checkBooking) {
        return { error: "Appointment not found", status: 404 };
      }

      let updateEventId: string = checkBooking.eventId;

      if (appointment_dateTime && checkBooking.appointment_dateTime !== appointment_dateTime) {
        if (checkBooking.eventId) {
          //delete
          await calendarService.deleteEvent(checkBooking.eventId);
        }
        // create
        const dateTime = new Date(appointment_dateTime);
        const newEventId = await calendarService.createEvent({
          year: dateTime.getFullYear(),
          month: dateTime.getMonth() + 1,
          day: dateTime.getDate(),
          hour: dateTime.getHours(),
          minute: dateTime.getMinutes(),
          description: checkBooking.symptom || "No description",
        });

        updateEventId = newEventId.eventID || '';
      }

      if (status == checkBooking.appointment_status) {
        return { error: "No changes", status: 304 };
      }

      let appointment_status = undefined;
      try {
        appointment_status = Status[status as keyof typeof Status];
      } catch (error) {
        return { error: "Invalid status", status: 400 };
      }
      const booking = await this.prisma.appointments.update({
        where: {
          id: id,
        },
        data: {
          ...(appointment_dateTime && { appointment_dateTime: appointment_dateTime }),
          ...(appointment_status && { appointment_status: appointment_status }),
          ...(updateEventId && { eventId: updateEventId }),
        },
      });

      return booking;
    } catch (error) {
      return { error: "Error while updating doctor appointment service: " + error, status: 500 };
    }
  }

  async getPatientAppointment(
    phone_number: string,
    firstname: string,
    lastname: string
  ) {
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          phone_number: phone_number,
          firstname: firstname,
          lastname: lastname,
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (appointments.length < 1) {
        return { error: "No appointments found for this patient.", status: 404 };
      }

      return { appointments };
    } catch (error) {
      return { error: "Error while fetching patient appointment service: " + error, status: 500 };
    }
  }

  //Me
  async updatePatientAppointment(data: any) {
    try {
      // ตรวจสอบว่ามีการจองอยู่หรือไม่
      const checkBooking = await this.prisma.appointments.findUnique({
        where: {
          id: data.id,
        },
      });

      if (!checkBooking) {
        throw new Error("Appointment not found");
      }

      if (checkBooking.appointment_dateTime !== data.appointment_dateTime) {
        if (checkBooking.eventId) {
          //delete
          await calendarService.deleteEvent(checkBooking.eventId);
        }
        // create
        const dateTime = new Date(data.appointment_dateTime);
        const newEventId = await calendarService.createEvent({
          year: dateTime.getFullYear(),
          month: dateTime.getMonth() + 1,
          day: dateTime.getDate(),
          hour: dateTime.getHours(),
          minute: dateTime.getMinutes(),
          description: data.symptom || "No description",
        });

        data.eventId = newEventId;
      } else {
        data.eventId = checkBooking.eventId;
      }

      const status_prisma = data.appointment_status;
      const booking = await this.prisma.appointments.update({
        where: {
          id: data.id,
        },
        data: {
          symptom: data.symptom,
          appointment_dateTime: data.appointment_dateTime,
          appointment_status: status_prisma,
          eventId: data.eventId,
        },
      });

      return booking;
    } catch (error) {
      throw error;
    }
  }

  // Consider bettween date and id for cancellaiton
  // ลบการจอง ของคนไข้
  // ต้องแก้ ถ้า  user จองซ้ำเยอะๆจะมีปัญหา และ ต้อง  check status ก่อนลบ
  async cancelAppointment(data: any) {
    try {
      if (!data.id || !data.firstname || !data.lastname || !data.phone_number) {
        return { error: "Missing required fields", status: 400 };
      }

      const booking = await this.prisma.appointments.findFirst({
        where: {
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          phone_number: data.phone_number,
        },
      });

      if (!booking) {
        return { error: "Booking not found", status: 404 };
      } else if (booking.appointment_status == Status.CANCELED) {
        return { error: "Booking already cancled.", status: 304 }
      }

      //Delete the google calendar event
      if (booking.eventId) {
        try {
          await calendarService.deleteEvent(booking.eventId);
        } catch (error) {
          return { error: "Error while deleting the Google Calendar event.", status: 500 };
        }
      }

      //Update status to canceled in database
      const updateBooking = await this.prisma.appointments.update({
        where: {
          id: booking.id,
        },
        data: {
          appointment_status: Status.CANCELED,
        },
      });

      const updateBookingReturn = {
        id: updateBooking.id,
        firstname: updateBooking.firstname,
        lastname: updateBooking.lastname,
        phone_number: updateBooking.phone_number,
        symptom: updateBooking.symptom,
        appointment_dateTime: updateBooking.appointment_dateTime,
        appointment_status: Status[updateBooking.appointment_status] as string
      };

      return { ...updateBookingReturn };
    } catch (error) {
      return { error: "Error while deleting booking service:" + error, status: 500 };
    }
  }
}

export const appointmentService = new AppointmentService();
