import { PrismaClient } from "@prisma/client";

class AppointmentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getRecord() {
    try {
      const appointments = await this.prisma.appointments.findMany({
        select: {
          id: true,
          test: true,
          createdAt: true,
        },
      });
      return appointments;
    } catch (error) {
      console.error("Error fetching appointments:", error);
      throw error;
    }
  }

  async createAppointment(data: any) {
    try {
      const product = await this.prisma.appointments.create({
        data,
      });
      return product;
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error;
    }
  }
}

export const appointmentService = new AppointmentService();
