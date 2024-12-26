import e, { Request, Response } from "express";
import { Status } from "@prisma/client";
import { appointmentService } from "./appointment.service";
import { error } from "console";

const validateDateTimeFormat = (dateTime: string): boolean => {
  const dateTimeFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/;
  return dateTimeFormat.test(dateTime);
}


class AppointmentController {
  constructor() { }

  async getAppointmentTimeSlot(req: Request, res: Response) {
    try {
      const { date } = req.query;

      if (!date) {
        res.status(400).json({
          status: 400,
          error: "Date is required"
        });
        return;
      }

      const result = await appointmentService.getAppointmentTimeSlot(date as string);

      res.status(result.status).json({
        status: result.status,
        data: result.data
      });
    } catch (error: any) {
      res.status(500).json({
        status: 500,
        error: "An unexpected error occurred while fetching appointment time slot: " + error.message
      });
    }
  }

  // สร้างการจอง ทั้งหมอและ คนไข้
  async createAppointment(req: Request, res: Response) {
    try {
      const { firstname, lastname, phone_number, symptom, appointment_dateTime } = req.body;

      if (!firstname || !lastname || !phone_number || !appointment_dateTime) {
        res.status(400).json({
          status: 400,
          error: "Missing required fields"
        });
        return;
      }

      if (appointment_dateTime && !validateDateTimeFormat(appointment_dateTime)) {
        res.status(400).json({
          status: 400,
          error: "Appointment date time is invalid"
        });
        return;
      }

      const result = await appointmentService.createBooking(firstname, lastname, phone_number, symptom, appointment_dateTime);

      res.status(result.status).json({
        status: result.status,
        data: result.data,
        message: result.error
      });

    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred while creating appointment controller:" + err;
      res.status(500).json({
        status: 500,
        error: errorMessage
      });
    }
  }

  // ดู การจองทั้งหมด หมอ
  async getDoctorAppointment(req: Request, res: Response) {
    try {
      const { date, firstname, lastname, status, phone_number } = req.query;

      if (date && isNaN(Date.parse(date as string))) {
        res.status(400).json({
          status: 400,
          error: "Invalid date format"
        });
        return;
      }

      let result: any;
      if (!date && !firstname && !lastname && !status && !phone_number) {
        result = await appointmentService.getDoctorAppointmentAll();
      } else {
        result = await appointmentService.getDoctorAppointmentByParameter(
          date as string,
          firstname as string,
          lastname as string,
          status as string,
          phone_number as string
        );
      }

      res.status(result.status).json({
        status: result.status,
        data: result.data
      });

    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred while fetching doctor appointment";
      res.status(500).json({
        status: 500,
        error: errorMessage
      });
    }
  }

  //  update การจอง ทั้งหมอและ คนไข้
  //  รับ UID เพื่อ หา และ อัพเดทข้อมูล
  async updateDoctorAppointment(req: Request, res: Response) {
    try {
      const { id, appointment_dateTime, status } = req.body;

      if (!id || !(appointment_dateTime || status)) {
        res.status(400).json({
          status: 400,
          error: "Missing required fields"
        });
        return;
      }

      if (appointment_dateTime && !validateDateTimeFormat(appointment_dateTime)) {
        res.status(400).json({
          status: 400,
          error: "Appointment date time is invalid"
        });
        return;
      }

      if (status && !Object.values(Status).includes(status as Status)) {
        res.status(400).json({
          status: 400,
          error: "Invalid status"
        });
        return;
      }

      const result: any = await appointmentService.updateDoctorAppointment(id, appointment_dateTime, status);

      if (result.error) {
        res.status(result.status).json(result);
        return;
      }

      res.status(200).json(result);

    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred while updating doctor appointment";
      res.status(500).json({
        status: 500,
        error: errorMessage
      });
    }
  }


  async getPatientAppointment(req: Request, res: Response) {
    try {
      const { phoneNumber, firstname, lastname } = req.query;

      if (!phoneNumber || !firstname || !lastname) {
        res.status(400).json({
          status: 400,
          error: "Phone number, firstname, and lastname are required"
        });
        return;
      }

      const result = await appointmentService.getPatientAppointment(
        phoneNumber as string,
        firstname as string,
        lastname as string
      );

      if (result.error) {
        res.status(result.status).json({
          status: result.status,
          error: result.error
        });
        return;
      }

      res.status(200).json({
        status: 200,
        data: result.data
      });

    } catch (error: any) {
      res.status(500).json({
        status: 500,
        error: "An unexpected error occurred while fetching patient appointment"
      });
    }
  }

  // อัพเดทข้อมูลการจอง ของคนไข้ update ได้หมด
  async updatePatientAppointment(req: Request, res: Response) {
    try {
      const { id, appointment_dateTime, symptom, firstname, lastname, phone_number } = req.body;

      if (!id || !(appointment_dateTime || symptom || firstname || lastname || phone_number)) {
        res.status(400).json({
          status: 400,
          error: "Missing required fields"
        });
        return;
      }

      if (appointment_dateTime && !validateDateTimeFormat(appointment_dateTime)) {
        res.status(400).json({
          status: 400,
          error: "Invalid appointment date time format"
        });
        return;
      }

      const result = await appointmentService.updatePatientAppointment(
        id,
        firstname,
        lastname,
        phone_number,
        appointment_dateTime,
        symptom
      );

      if (result.error) {
        res.status(result.status).json({
          status: result.status,
          error: result.error
        });
        return;
      }

      res.status(200).json({
        status: 200,
        data: result.data
      });

    } catch (error: any) {
      res.status(500).json({
        status: 500,
        error: `Error updating patient appointment: ${error.message}`
      });
    }
  }

  //  delete (ยกเลิกการจอง) การจอง ทั้งหมอ
  //  รับ UID

  //  delete (ยกเลิกการจอง) การจอง ของคนไข้
  //  รับ firstname และ lastname
  async cancelAppointment(req: Request, res: Response) {
    try {
      const result: any = await appointmentService.cancelAppointment(req.body);
      if (result.error) {
        res.status(result.status).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (err: any) {
      res.status(500).send({ error: "An unexpected error occurred while canceling appointment controller:" + err.message });
    }
  }
}
export const appointmentController = new AppointmentController();
