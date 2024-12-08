import { PrismaClient } from "@prisma/client";

class BookingService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  async creteBooking(data: any) {
    try {
      const booking = await this.prisma.booking.create({
        data,
      });
      return booking;
    } catch (error) {
      console.error("Error creating booking:", error);
      throw error;
    }
  }
  async getAllBooking() {
    try {
      const booking = await this.prisma.booking.findMany();
      return booking;
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
  }
  async getBooking(data: any) {
    try {
      const booking = await this.prisma.booking.findFirst({
        where: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
      });
      return booking;
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
  }
  async updateBooking(data: any) {
    try {
      const booking = await this.prisma.booking.update({
        where: {
          UID: data.UID,
        },
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          status: data.status,
        },
      });
      return booking;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  }
  async deleteBooking(data: any) {
    try {
      const booking = await this.prisma.booking.delete({
        where: {
          UID: data.UID,
        },
      });
      return booking;
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  }
}

export const bookingService = new BookingService();
