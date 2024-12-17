import { PrismaClient, Status } from "@prisma/client";
import { calendarService } from "../calendar/calendar.service";

class AppointmentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // ME
  async creteBooking(data: any) {
    try {
      const {
        firstname,
        lastname,
        phone_number,
        symptom,
        appointment_dateTime,
        status,
      } = data;

      const checkBooking = await this.prisma.appointments.findMany({
        where: {
          appointment_dateTime: data.appointment_dateTime,
          NOT: {
            status: "Canceled",
          },
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (checkBooking.length > 0) {
        throw new Error("Time slot already taken");
      }
      // Create Google Calendar Event
      const dateTime = new Date(appointment_dateTime);
      const eventId = await calendarService.createEvent({
        year: dateTime.getFullYear(),
        month: dateTime.getMonth() + 1,
        day: dateTime.getDate(),
        hour: dateTime.getHours(),
        minute: dateTime.getMinutes(),
        description: symptom || "No description",
      });

      const booking = await this.prisma.appointments.create({
        data: {
          eventId,
          firstname,
          lastname,
          phone_number,
          symptom,
          appointment_dateTime,
          status,
        },
      });

      return booking;
    } catch (error) {
      console.error(
        "Error creating appointment and Google Calendar event:",
        error
      );
      throw new Error("Error while creating appointment.");
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
        return "No appointment found";
      }

      return appointments;
    } catch (error) {
      throw new Error("Error while fetching all doctor appointment");
    }
  }

  async getDoctorAppointmentDate(date: string) {
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          appointment_dateTime: date,
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });
      if (appointments.length === 0) {
        return "No appointment found";
      }
      return appointments;
    } catch (error) {
      throw new Error("Error while fetching doctor appointment by date");
    }
  }

  async getDoctorAppointmentName(firstname: string, lastname: string) {
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          firstname: firstname,
          lastname: lastname,
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });
      if (appointments.length === 0) {
        return "No appointment found";
      }
      return appointments;
    } catch (error) {
      throw new Error(
        "Error while fetching doctor appointment by patient name"
      );
    }
  }

  async getDoctorAppointmentStatus(status: string) {
    try {
      const status_prisma = Status[status as keyof typeof Status];
      const appointments = await this.prisma.appointments.findMany({
        where: {
          status: status_prisma,
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });
      if (appointments.length === 0) {
        return "No appointment found";
      }
      return appointments;
    } catch (error) {
      throw new Error("Error while fetching doctor appointment by status");
    }
  }

  async getDoctorAppointmentPhoneNumber(phone: string) {
    try {
      const appointments = await this.prisma.appointments.findMany({
        where: {
          phone_number: phone,
        },
      });
      if (appointments.length === 0) {
        return "No appointment found";
      }
      return appointments;
    } catch (error) {
      throw new Error(
        "Error while fetching doctor appointment by phone number"
      );
    }
  }

  //fix
  //ME
  async updateDoctorAppointment(data: any) {
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

      const booking = await this.prisma.appointments.update({
        where: {
          id: data.id,
        },
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          phone_number: data.phone_number,
          symptom: data.symptom,
          appointment_dateTime: data.appointment_dateTime,
          status: data.status,
          eventId: data.eventId,
        },
      });

      return booking;
    } catch (error) {
      throw error;
    }
  }

  async getPatientAppointment(
    phone_number: string,
    firstname: string,
    lastname: string
  ) {
    try {
      const today = new Date();
      console.log("date:", today);
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

      if (!appointments.length) {
        return { message: "No appointments found for this patient." };
      }

      return {
        appointmentDetails: appointments,
      };
    } catch (error) {
      console.error("Error fetching appointment status:", error);
      throw error;
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

      const status_prisma = data.status;
      const booking = await this.prisma.appointments.update({
        where: {
          id: data.id,
        },
        data: {
          symptom: data.symptom,
          appointment_dateTime: data.appointment_dateTime,
          status: status_prisma,
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
  // ต้องแก้ ถ้า  user จองซ้ำเยอะๆจะมีปัญหา และ ต้อง  check status ก่อนลบ
  async cancelAppointment(data: any) {
    try {
      const booking = await this.prisma.appointments.findFirst({
        where: {
          firstname: data.firstname,
          lastname: data.lastname,
          phone_number: data.phone_number,
          appointment_dateTime: data.appointment_dateTime, // Add date when request
          NOT: {
            status: "Canceled",
          },
        },
      });

      if (!booking) {
        console.error("Booking not found with data:", data);
        throw new Error("Booking not found");
      }

      //Delete the google calendar event
      if (booking.eventId) {
        try {
          await calendarService.deleteEvent(booking.eventId);
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              "Error deleting Google Calendar event:",
              error.message
            );
            throw new Error("Failed to delete the Google Calendar event.");
          }
        }
      }

      //Update status to canceled in database
      const status_prisma = "Canceled";
      return await this.prisma.appointments.update({
        where: {
          id: booking.id,
        },
        data: {
          status: status_prisma,
        },
      });
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  }
}

export const appointmentService = new AppointmentService();
