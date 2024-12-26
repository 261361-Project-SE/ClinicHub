import { Appointments, PrismaClient, Status } from "@prisma/client";
import { calendarService } from "../calendar/calendar.service";


class AppointmentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private isChanged = (dbdata: Appointments, newData: Appointments) => {
    try {
      const fields = ['firstname', 'lastname', 'phone_number', 'appointment_dateTime', 'symptom', 'appointment_status'];
      return fields.some(field => dbdata[field as keyof Appointments] !== newData[field as keyof Appointments]);
    } catch (error) {
      return true;
    }
  }

  async getAppointmentTimeSlot(date: string) {
    try {
      const appointments = await this.prisma.appointments.findMany({
        select: {
          appointment_dateTime: true,
        },
        where: {
          AND: [
            {
              appointment_dateTime: {
                contains: date
              }
            },
            {
              appointment_status: {
                not: Status.CANCELED
              }
            }
          ]
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (!appointments || appointments.length === 0) {
        return {
          status: 200,
          data: []
        };
      }

      return {
        status: 200,
        data: appointments
      };
    } catch (error) {
      throw new Error(`Error while fetching appointment time slots: ${error}`);
    }
  }

  // ME
  async createBooking(firstname: string, lastname: string, phone_number: string, symptom: string, appointment_dateTime: string) {
    try {
      // Check if time slot is already booked
      const existingBooking = await this.prisma.appointments.findFirst({
        where: {
          appointment_dateTime,
          appointment_status: {
            not: Status.CANCELED
          }
        }
      });

      if (existingBooking) {
        return {
          status: 400,
          error: "Time slot already taken"
        };
      }

      // Create calendar event
      const dateTime = new Date(appointment_dateTime);
      const calendarEvent = await calendarService.createEvent({
        year: dateTime.getFullYear(),
        month: dateTime.getMonth() + 1,
        day: dateTime.getDate(),
        hour: dateTime.getHours(),
        minute: dateTime.getMinutes(),
        description: symptom || "No description"
      });

      // Create appointment record
      const appointment = await this.prisma.appointments.create({
        data: {
          eventId: calendarEvent.eventID || "",
          firstname,
          lastname,
          phone_number,
          symptom,
          appointment_dateTime,
          appointment_status: Status.PENDING
        }
      });

      return {
        status: 200,
        data: {
          id: appointment.id,
          firstname: appointment.firstname,
          lastname: appointment.lastname,
          phone_number: appointment.phone_number,
          symptom: appointment.symptom,
          appointment_dateTime: appointment.appointment_dateTime,
          appointment_status: Status[appointment.appointment_status]
        }
      };

    } catch (error) {
      if (error instanceof Error && error.message === "Time slot is busy.") {
        return {
          status: 400,
          error: `Error while creating google calendar event: ${error.message}`
        };
      }
      throw new Error(`Error while creating appointment: ${error}`);
    }
  }

  async getDoctorAppointmentAll() {
    try {
      const appointments = await this.prisma.appointments.findMany({
        orderBy: {
          appointment_dateTime: 'asc'
        }
      });

      return {
        status: 200,
        data: appointments || []
      };
    } catch (error) {
      throw new Error(`Error while fetching all doctor appointments: ${error}`);
    }
  }

  async getDoctorAppointmentByParameter(date: string, firstname: string, lastname: string, status: string, phone_number: string) {
    try {
      const where: any = {};

      if (date) {
        where.appointment_dateTime = {
          contains: date
        };
      }

      if (firstname) {
        where.firstname = {
          contains: firstname
        };
      }

      if (lastname) {
        where.lastname = {
          contains: lastname
        };
      }

      if (status) {
        const statusEnum = Status[status.toUpperCase() as keyof typeof Status];
        if (statusEnum) {
          where.appointment_status = statusEnum;
        }
      }

      if (phone_number) {
        where.phone_number = {
          contains: phone_number
        };
      }

      const appointments = await this.prisma.appointments.findMany({
        where,
        orderBy: {
          appointment_dateTime: "asc"
        }
      });

      return {
        status: 200,
        data: appointments
      };

    } catch (error) {
      throw new Error(`Error fetching doctor appointments: ${error}`);
    }
  }


  async updateDoctorAppointment(id: number, appointment_dateTime: string, status: string) {
    try {
      const existingAppointment = await this.prisma.appointments.findUnique({
        where: { id }
      });

      if (!existingAppointment) {
        return {
          status: 404,
          error: "Appointment not found"
        };
      }

      const appointmentStatus = Status[status as keyof typeof Status];
      if (status && !appointmentStatus) {
        return {
          status: 400,
          error: "Invalid status"
        };
      }

      const updatedAppointment: Appointments = {
        ...existingAppointment,
        appointment_dateTime: appointment_dateTime || existingAppointment.appointment_dateTime,
        appointment_status: appointmentStatus || existingAppointment.appointment_status
      };

      if (!this.isChanged(existingAppointment, updatedAppointment)) {
        return {
          status: 304,
          message: "No changes detected"
        };
      }

      let eventId = existingAppointment.eventId;

      if (appointment_dateTime && existingAppointment.appointment_dateTime !== appointment_dateTime) {
        if (existingAppointment.eventId) {
          await calendarService.deleteEvent(existingAppointment.eventId);
        }

        const dateTime = new Date(appointment_dateTime);
        const newEvent = await calendarService.createEvent({
          year: dateTime.getFullYear(),
          month: dateTime.getMonth() + 1,
          day: dateTime.getDate(),
          hour: dateTime.getHours(),
          minute: dateTime.getMinutes(),
          description: existingAppointment.symptom || "No description"
        });

        eventId = newEvent.eventID || existingAppointment.eventId;
      }

      const updatedRecord = await this.prisma.appointments.update({
        where: { id },
        data: {
          ...(appointment_dateTime && { appointment_dateTime }),
          ...(appointmentStatus && { appointment_status: appointmentStatus }),
          ...(eventId && { eventId })
        }
      });

      return {
        status: 200,
        data: updatedRecord
      };

    } catch (error) {
      throw new Error(`Error while updating doctor appointment: ${error}`);
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
          phone_number,
          firstname,
          lastname
        },
        orderBy: {
          appointment_dateTime: "asc"
        }
      });

      if (!appointments || appointments.length === 0) {
        return {
          status: 404,
          error: "No appointments found for this patient"
        };
      }

      return {
        status: 200,
        data: appointments
      };

    } catch (error) {
      throw new Error(`Error while fetching patient appointments: ${error}`);
    }
  }

  //Me
  async updatePatientAppointment(
    id: number,
    firstname: string,
    lastname: string,
    phone_number: string,
    appointment_dateTime: string,
    symptom: string
  ) {
    try {
      const existingAppointment = await this.prisma.appointments.findUnique({
        where: { id }
      });

      if (!existingAppointment) {
        return {
          status: 404,
          error: "Appointment not found"
        };
      }

      if (existingAppointment.appointment_status === Status.CANCELED) {
        return {
          status: 304,
          error: "Cannot update canceled appointment"
        };
      }

      const newData: Appointments = {
        ...existingAppointment,
        firstname,
        lastname,
        phone_number,
        appointment_dateTime,
        symptom
      };

      if (!this.isChanged(existingAppointment, newData)) {
        return {
          status: 304,
          error: "No changes detected"
        };
      }

      let eventId = existingAppointment.eventId;

      if (existingAppointment.appointment_dateTime !== appointment_dateTime) {
        // Delete old calendar event
        if (existingAppointment.eventId) {
          await calendarService.deleteEvent(existingAppointment.eventId);
        }

        // Create new calendar event
        const dateTime = new Date(appointment_dateTime);
        const calendarEvent = await calendarService.createEvent({
          year: dateTime.getFullYear(),
          month: dateTime.getMonth() + 1,
          day: dateTime.getDate(),
          hour: dateTime.getHours(),
          minute: dateTime.getMinutes(),
          description: symptom || existingAppointment.symptom || "No description"
        });

        eventId = calendarEvent.eventID || existingAppointment.eventId;
      }

      const updatedAppointment = await this.prisma.appointments.update({
        where: { id },
        data: {
          firstname,
          lastname,
          phone_number,
          symptom,
          appointment_dateTime,
          eventId
        }
      });

      return {
        status: 200,
        data: updatedAppointment
      };

    } catch (error) {
      throw new Error(`Error while updating patient appointment: ${error}`);
    }
  }

  // Consider bettween date and id for cancellaiton
  // ลบการจอง ของคนไข้
  // ต้องแก้ ถ้า  user จองซ้ำเยอะๆจะมีปัญหา และ ต้อง  check status ก่อนลบ
  async cancelAppointment(data: { id: string; firstname: string; lastname: string; phone_number: string }) {
    try {
      const { id, firstname, lastname, phone_number } = data;

      if (!id || !firstname || !lastname || !phone_number) {
        return {
          status: 400,
          error: "Missing required fields"
        };
      }

      const appointment = await this.prisma.appointments.findFirst({
        where: {
          id: Number(id),
          firstname,
          lastname,
          phone_number
        }
      });

      if (!appointment) {
        return {
          status: 404,
          error: "Appointment not found"
        };
      }

      if (appointment.appointment_status === Status.CANCELED) {
        return {
          status: 304,
          error: "Appointment already cancelled"
        };
      }

      if (appointment.eventId) {
        try {
          await calendarService.deleteEvent(appointment.eventId);
        } catch (error) {
          return {
            status: 500,
            error: `Error deleting Google Calendar event: ${error}`
          };
        }
      }

      const cancelledAppointment = await this.prisma.appointments.update({
        where: {
          id: appointment.id
        },
        data: {
          appointment_status: Status.CANCELED
        }
      });

      return {
        status: 200,
        data: {
          id: cancelledAppointment.id,
          firstname: cancelledAppointment.firstname,
          lastname: cancelledAppointment.lastname,
          phone_number: cancelledAppointment.phone_number,
          symptom: cancelledAppointment.symptom,
          appointment_dateTime: cancelledAppointment.appointment_dateTime,
          appointment_status: Status[cancelledAppointment.appointment_status]
        }
      };

    } catch (error) {
      throw new Error(`Error while cancelling appointment: ${error}`);
    }
  }
}

export const appointmentService = new AppointmentService();
