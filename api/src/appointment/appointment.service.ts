import { Appointments, PrismaClient, Status, Prisma } from "@prisma/client";
import { calendarService } from "../calendar/calendar.service";

class AppointmentService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }


  private isChanged(dbdata: Appointments, newData: Appointments): boolean {
    try {
      if (!dbdata || !newData) {
        return true;
      }

      const fields = ['firstname', 'lastname', 'phone_number', 'appointment_dateTime', 'symptom', 'appointment_status'] as (keyof Appointments)[];

      for (const field of fields) {
        if (dbdata[field] !== newData[field]) {
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Error checking if appointment has changed:', error);
      return true;
    }
  }

  private validateTimeSlot(date: string, required: boolean): boolean {
    try {
      if (!date) {
        return !required;
      }

      const todayTime = new Date();
      const selectedTime = new Date(date);

      if (isNaN(selectedTime.getTime())) {
        return false;
      }

      return selectedTime > todayTime && selectedTime.getMinutes() % 15 == 0;
    } catch (error) {
      console.error("Error checking time slot:", error);
      return false;
    }
  }

  private async checkAddableAppointment(date: string, id: number, required: boolean): Promise<boolean> {
    if (!date) {
      return !required
    }

    try {
      const checkBooking = await this.prisma.appointments.findMany({
        where: {
          appointment_dateTime: date,
          NOT: {
            appointment_status: Status.CANCELED,
          },
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (checkBooking.length > 0 && checkBooking.some(booking => booking.id != id)) {
        return false;
      }

      return true;

    } catch (error: any) {
      return false;
    }
  }

  private async createGoogleCalendar(date: string, symptom: string): Promise<{ isCreated: boolean, eventID: string | undefined, cError: string | undefined }> {
    try {
      const dateTime = new Date(date);
      const response = await calendarService.createEvent({
        year: dateTime.getFullYear(),
        month: dateTime.getMonth() + 1,
        day: dateTime.getDate(),
        hour: dateTime.getHours(),
        minute: dateTime.getMinutes(),
        description: symptom || "No description",
      });
      return { isCreated: true, eventID: response.eventID, cError: undefined }
    } catch (error: any) {
      console.log(error);
      return { isCreated: false, eventID: undefined, cError: error }
    }
  }

  async getAppointmentTimeSlot(date: string) {
    if (!date) {
      return { error: "Invalid date", status: 400 };
    }

    try {
      const appointments = await this.prisma.appointments.findMany({
        select: {
          appointment_dateTime: true,
        },
        where: {
          appointment_dateTime: {
            contains: date,
          },
          appointment_status: {
            not: Status.CANCELED,
          },
        },
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (!appointments) {
        return { data: [], status: 200 };
      }

      return { data: appointments, status: 200 };
    } catch (error) {
      return { error: "Error while fetching appointment time slot service: " + error, status: 500 };
    }
  }

  async creteBooking(firstname: string, lastname: string, phone_number: string, symptom: string, appointment_dateTime: string) {
    if (!firstname || !lastname || !phone_number || !symptom || !appointment_dateTime) {
      return { error: "Missing required fields", status: 400 };
    }

    if (!this.validateTimeSlot(appointment_dateTime, true)) {
      return { error: "Invalid time slot", status: 400 };
    }

    try {
      // Check existing appointment
      const isAvailable = await this.checkAddableAppointment(appointment_dateTime, -1, true);
      if (!isAvailable) {
        return { error: "Time slot already existing", status: 400 };
      }

      // Create Google Calendar event
      const { isCreated, eventID, cError } = await this.createGoogleCalendar(appointment_dateTime, symptom);
      if (!isCreated || !eventID) {
        return { error: "Error while creating google calendar: " + (cError || 'unknown error'), status: 500 };
      }

      // Create booking on database
      const booking = await this.prisma.appointments.create({
        data: {
          eventId: eventID,
          firstname: firstname,
          lastname: lastname,
          phone_number: phone_number,
          symptom: symptom,
          appointment_dateTime: appointment_dateTime,
          appointment_status: Status.PENDING,
        },
      });

      // Return errer if failed to create booking
      if (!booking) {
        return { error: "Failed to create booking", status: 500 };
      }

      // Construct return data
      const constructedData = {
        id: booking.id,
        firstname: booking.firstname,
        lastname: booking.lastname,
        phone_number: booking.phone_number,
        symptom: booking.symptom,
        appointment_dateTime: booking.appointment_dateTime,
        appointment_status: Status[booking.appointment_status] as string,
      };
      return { data: constructedData, status: 200 };

    } catch (error) {
      if (error instanceof Error) {
        return { error: "Error while creating appointment service: " + (error.message || error), status: 500 };
      }
      return { error: "An unexpected error occurred", status: 500 };
    }
  }

  async getDoctorAppointmentAll() {
    try {
      const appointments = await this.prisma.appointments.findMany({
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      // Return error if no data found
      if (!appointments || appointments.length <= 0) {
        return { data: [], status: 200 };
      }

      // Construct return data
      const constructedData = appointments.map(appointment => ({
        id: appointment.id,
        firstname: appointment.firstname,
        lastname: appointment.lastname,
        phone_number: appointment.phone_number,
        symptom: appointment.symptom,
        appointment_dateTime: appointment.appointment_dateTime,
        appointment_status: Status[appointment.appointment_status] as string,
      }));

      return { data: constructedData, status: 200 };

    } catch (error) {
      if (error instanceof Error) {
        return { error: "Error while fetching all doctor appointment service: " + error.message, status: 500 };
      }
      return { error: "An unexpected error occurred", status: 500 };
    }
  }

  async getDoctorAppointmentByParameter(date: string, firstname: string, lastname: string, status: string, phone_number: string) {
    try {
      const status_prisma = status ? Status[status.toUpperCase() as keyof typeof Status] : undefined;
      const where: Prisma.AppointmentsWhereInput = {
        appointment_dateTime: {
          contains: date || '',
        },
        firstname: {
          contains: firstname || '',
        },
        lastname: {
          contains: lastname || '',
        },
        phone_number: {
          contains: phone_number || '',
        }
      };

      if (status_prisma) {
        where.appointment_status = status_prisma;
      }

      const appointments = await this.prisma.appointments.findMany({
        where,
        orderBy: {
          appointment_dateTime: "asc",
        },
      });

      if (!appointments || appointments.length <= 0) {
        return { data: [], status: 200 };
      }

      return { data: appointments, status: 200 };

    } catch (error) {
      if (error instanceof Error) {
        return { error: "Error while fetching doctor appointment by parameters service: " + error.message, status: 500 };
      }
      return { error: "An unexpected error occurred", status: 500 };
    }
  }

  async updateDoctorAppointment(id: number, appointment_dateTime: string, status: string) {
    // Check required id and one of status or datetime
    if (!id || (!appointment_dateTime && !status)) {
      return { error: "Missing required fields", status: 400 };
    }

    // Check time slot
    if (!this.validateTimeSlot(appointment_dateTime, false)) {
      return { error: "Invalid time slot", status: 400 };
    }

    // Check appointment status 
    let appointment_status = undefined;
    try {
      appointment_status = Status[status as keyof typeof Status];
    } catch (error) {
      return { error: "Invalid status", status: 400 };
    }

    try {
      // Check existing appointment
      const checkBooking = await this.prisma.appointments.findUnique({
        where: {
          id: id,
        },
      });

      if (!checkBooking) {
        return { error: "Appointment not found", status: 404 };
      }

      // Check existing booking
      const isAvailable = await this.checkAddableAppointment(appointment_dateTime, id, false);
      if (!isAvailable) {
        return { error: "Time slot already existing", status: 400 };
      }

      // Construct new data
      const newData: Appointments = {
        ...checkBooking,
        appointment_dateTime: appointment_dateTime,
        appointment_status: appointment_status,
      }

      if (!this.isChanged(checkBooking, newData)) {
        return { error: "No changes", status: 304 };
      }

      // create google calendar event
      const { isCreated, eventID, cError } = await this.createGoogleCalendar(appointment_dateTime, checkBooking.symptom);

      if (!isCreated) {
        return { error: "Error while creating google calendar: " + (cError || 'unknown error'), status: 500 };
      }

      // Delete google calendar event
      if (checkBooking.eventId && isCreated) {
        await calendarService.deleteEvent(checkBooking.eventId);
      }

      const booking = await this.prisma.appointments.update({
        where: { id },
        data: {
          appointment_dateTime: appointment_dateTime || undefined,
          appointment_status: appointment_status || undefined,
          eventId: eventID || undefined,
        },
      });

      return { data: booking, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        return { error: "Error while updating doctor appointment service: " + error, status: 500 };
      }
      return { error: "An unexpected error occurred", status: 500 };
    }
  }

  async getPatientAppointment(phone_number: string, firstname: string, lastname: string) {
    if (!phone_number || !firstname || !lastname) {
      return { error: "Missing required fields", status: 400 };
    }
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

      if (!appointments || appointments.length < 1) {
        return { error: "No appointments found", status: 404 };
      }

      return { data: appointments, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        return { error: "Error while fetching patient appointment service: " + error.message, status: 500 };
      }
      return { error: "An unexpected error occurred", status: 500 };
    }
  }

  async updatePatientAppointment(id: number, firstname: string, lastname: string, phone_number: string, appointment_dateTime: string, symptom: string) {
    if (!id || (!appointment_dateTime && !symptom && !firstname && !lastname && !phone_number)) {
      return { error: "Missing required fields", status: 400 };
    }

    // Check time slot
    if (!this.validateTimeSlot(appointment_dateTime, false)) {
      return { error: "Invalid time slot", status: 400 };
    }

    try {
      // Check existing appointment
      const checkBooking = await this.prisma.appointments.findUnique({
        where: {
          id: id,
        },
      });

      if (!checkBooking) {
        return { error: "Appointment not found", status: 404 };
      }

      // Check existing booking
      const isAvailable = await this.checkAddableAppointment(appointment_dateTime, id, false);
      if (!isAvailable) {
        return { error: "Time slot already existing", status: 400 };
      }

      if (checkBooking.appointment_status == Status.CANCELED) {
        return { error: "Appointment canceled", status: 400 };
      }

      // Construct new data
      const newData: Appointments = {
        id: checkBooking.id,
        eventId: checkBooking.eventId,
        firstname: firstname || checkBooking.firstname,
        lastname: lastname || checkBooking.lastname,
        phone_number: phone_number || checkBooking.phone_number,
        appointment_dateTime: appointment_dateTime || checkBooking.appointment_dateTime,
        symptom: symptom || checkBooking.symptom,
        appointment_status: checkBooking.appointment_status,
        createdAt: checkBooking.createdAt,
        updatedAt: checkBooking.updatedAt,
      }

      if (!this.isChanged(checkBooking, newData)) {
        return { error: "No changes", status: 304 };
      }

      // create google calendar event
      const { isCreated, eventID, cError } = await this.createGoogleCalendar(appointment_dateTime, checkBooking.symptom);

      if (!isCreated) {
        return { error: "Error while creating google calendar: " + (cError || 'unknown error'), status: 500 };
      }

      // Delete google calendar event
      if (checkBooking.eventId && isCreated) {
        await calendarService.deleteEvent(checkBooking.eventId);
      }

      const booking = await this.prisma.appointments.update({
        where: {
          id: checkBooking.id,
        },
        data: {
          ...checkBooking,
          firstname: firstname || checkBooking.firstname,
          lastname: lastname || checkBooking.lastname,
          phone_number: phone_number || checkBooking.phone_number,
          symptom: symptom || checkBooking.symptom,
          appointment_dateTime: appointment_dateTime || checkBooking.appointment_dateTime,
          eventId: eventID || checkBooking.eventId,
        },
      });

      return { data: booking, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        return { error: "Error while updating patient appointment service: " + error, status: 500 };
      }
      return { error: "An unexpected error occurred", status: 500 };
    }
  }


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

      const cancledBooking = {
        id: updateBooking.id,
        firstname: updateBooking.firstname,
        lastname: updateBooking.lastname,
        phone_number: updateBooking.phone_number,
        symptom: updateBooking.symptom,
        appointment_dateTime: updateBooking.appointment_dateTime,
        appointment_status: Status[updateBooking.appointment_status] as string
      };

      return { data: cancledBooking, status: 200 };
    } catch (error) {
      if (error instanceof Error) {
        return { error: "Error while deleting booking service:" + error, status: 500 };
      }
      return { error: "An unexpected error occurred", status: 500 };
    }
  }
}

export const appointmentService = new AppointmentService();
