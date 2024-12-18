import { PrismaClient } from "@prisma/client";

class BookingService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  // สร้างการจอง ทั้งหมอ
  async creteBooking(data: any) {
    try {
      const {
        firstname,
        lastname,
        phone_number,
        appointment_date,
        appointment_time,
        status,
        age,
        details,
      } = data;

      const checkBooking = await this.prisma.booking.findMany({
        where: {
          appointment_date: data.appointment_date,
          appointment_time: data.appointment_time,
        },
      });

      if (checkBooking.length > 0) {
        throw new Error('Booking already exists');
      }

      
      const booking = await this.prisma.booking.create({
        data: {
          firstname,
          lastname,
          age,
          phone_number,
          details,
          appointment_date,
          appointment_time,
          status,
        },
      });

      return booking;

    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  }

  // ดูการจองตามวันเดือน หมอ
  async getAllBookingByDate(data: any) {
    try {
      const booking = await this.prisma.booking.findMany({
        where: {
          appointment_date: data.date,
        },
      });
      if (booking.length === 0) {
        return "No booking found";
      }

      return booking;
    } catch (error) {
      throw new Error('Error fetching booking');
    }
  }
  // ดูการจองทั้งหมด หมอ
  async getAllBooking() {
    try {
      const booking = await this.prisma.booking.findMany();
      if (booking.length === 0) {
        return "No booking found";
      }

      return booking;
    } catch (error) {
      throw new Error('Error fetching booking');
    }
  }

  // ดูการจองตามชื่อ คนไข่
  async getBookingByName(data: any) {
    try {
      const booking = await this.prisma.booking.findMany({
        where: {
          firstname: data.firstname,
          lastname: data.lastname,
        },
      });

      if (booking.length === 0) {
        return "No booking found";
      }

      return booking;
    } catch (error) {
      throw new Error('Error fetching booking');
    }
  }

  // ดูการจองตามเบอร์โทรศัพท์ คนไข่
  async getBookingByPhone(data: any) {
    try {
      const booking = await this.prisma.booking.findMany({
        where: {
          phone_number: data.phone,
        },
      });

      if (booking.length === 0) {
        return "No booking found";
      }

      return booking;
    } catch (error) {
      throw new Error('Error fetching booking');
    }
  }

  // อัพเดทข้อมูลการจอง ของหมอ update ได้หมด
  async updateBookingByUID(data: any) {
    try {

      // ตรวจสอบว่ามีการจองอยู่หรือไม่
      const checkBooking = await this.prisma.booking.findMany({
        where: {
          appointment_date: data.appointment_date,
          appointment_time: data.appointment_time,
        },
      });

      if (checkBooking.length > 0) {
        throw new Error('Booking already exists');
      }

      const booking = await this.prisma.booking.update({
        where: {
          UID: data.UID,
        },
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          age: data.age,
          phone_number: data.phone_number,
          details: data.details,
          appointment_date: data.appointment_date,
          appointment_time: data.appointment_time,
          status: data.status,
        },
      });
      return booking;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  }


  // อัพเดทข้อมูลการจอง ของคนไข่ update 
  // รับข้อมูลชื่อ นามสกุล และ เบอร์โทรศัพท์ คนไข่
  // รับข้อมูลวันนัดเดิม และ วันนัดใหม่
  async updateBookingByDate(data: any) {
    try {
      const booking = await this.prisma.booking.findFirst({
        where: {
          firstname: data.firstname,
          lastname: data.lastname,
          phone_number: data.phone_number,
          appointment_date: data.dateOld,
        },
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      const checkBooking = await this.prisma.booking.findMany({
        where: {
          appointment_date: data.dateNew,
          appointment_time: data.timeNew,
        },
      });

      if (checkBooking.length > 0) {
        throw new Error('Booking already exists');
      }


      // Parse the appointment date and requested date
      // const appointmentDate = new Date(booking.appointment_date);
      // const requestedDate = new Date(data.date);

      // // Calculate difference in days
      // const diffTime = appointmentDate.getTime() - requestedDate.getTime();
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const updatedBooking = await this.prisma.booking.update({
        where: {
          UID: booking.UID,
        },
          data: {
            appointment_date: data.dateNew,
            appointment_time: data.timeNew,
        },
      });

      return updatedBooking;
    } catch (error) {
      console.error("Error updating booking date:", error);
      throw error;
    }
  }

  // ลบการจอง ของหมอ
  async deleteBooking(data: any) {
    try {
      const booking = await this.prisma.booking.findFirst({
        where: {
          UID: data.UID,
        },
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      return await this.prisma.booking.delete({
        where: {
          UID: booking.UID,
        },
      });

    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  }

  // ลบการจอง ของคนไข่
  // ต้องแก้ ถ้า  user จองซ้ำเยอะๆจะมีปัญหา และ ต้อง  check status ก่อนลบ
  async deleteBookingByPatient(data: any) {
    try {
      const booking = await this.prisma.booking.findFirst({
        where: {
          firstname: data.firstname,
          lastname: data.lastname,
          phone_number: data.phone_number,
        },
      });

      if (!booking) {
        throw new Error('Booking not found');
      }
      return await this.prisma.booking.delete({
        where: {
          UID: booking.UID,
        },
      });

    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  }
}

export const bookingService = new BookingService();
