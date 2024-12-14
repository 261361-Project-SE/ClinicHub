import { PrismaClient, Status } from "@prisma/client";
import { log } from "console";

class AppointmentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async creteBooking(data: any) {
    try {
      const {
        eventId,
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
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (checkBooking.length > 0) {
        throw new Error("Time slot already taken");
      }

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
      throw new Error("Error while creating appointment");
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

  async updateDoctorAppointment(data: any) {
    try {
      // ตรวจสอบว่ามีการจองอยู่หรือไม่
      const checkBooking = await this.prisma.appointments.findMany({
        where: {
          id: data.id,
        },
      });


      if (checkBooking.length <= 0) {
        throw new Error("Appointment not found");
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

  async updatePatientAppointment(data: any) {
    try {
      // ตรวจสอบว่ามีการจองอยู่หรือไม่
      const checkBooking = await this.prisma.appointments.findMany({
        where: {
          id: data.id,
        },
      });

      if (checkBooking.length > 0) {
        throw new Error("Appointment not found");
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
        },
      });

      return booking;
    } catch (error) {
      throw error;
    }
  }

  // ลบการจอง ของคนไข้
  // ต้องแก้ ถ้า  user จองซ้ำเยอะๆจะมีปัญหา และ ต้อง  check status ก่อนลบ
  async cancelAppointment(data: any) {
    try {
      const booking = await this.prisma.appointments.findFirst({
        where: {
          firstname: data.firstname,
          lastname: data.lastname,
          phone_number: data.phone_number,
        },
      });

      if (!booking) {
        throw new Error("Booking not found");
      }

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
