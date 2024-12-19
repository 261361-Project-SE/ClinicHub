import e, { Request, Response } from "express";
import { Status } from "@prisma/client";
import { appointmentService } from "./appointment.service";

class AppointmentController {
  constructor() { }

  // สร้างการจอง ทั้งหมอและ คนไข้
  async createAppointment(req: Request, res: Response) {
    try {

      const { firstname, lastname, phone_number, symptom, appointment_dateTime } = req.body;

      if (!req.body) {
        res.status(400).send({ error: "Request body is required" });
      }

      if (!appointment_dateTime || isNaN(Date.parse(appointment_dateTime))) {
        res.status(400).send({ error: "Appointment date time is invalid" });
      }

      const result: any = await appointmentService.creteBooking(firstname, lastname, phone_number, symptom, appointment_dateTime);
      if (result.error) {
        res.status(result.status).send(result);
      } else {
        res.status(200).send(result);
      }

    } catch (err: any) {
      res.status(500).send({ error: "An unexpected error occurred while creating appointment controller:" + err.message });
    }
  }

  // ดู การจองทั้งหมด หมอ
  async getDoctorAppointment(req: Request, res: Response) {
    try {
      const { date, name, status, phone_number } = req.query;

      if (!date && !name && !status && !phone_number) {
        const result: any = await appointmentService.getDoctorAppointmentAll();
        res.status(result.status).send(result);
      }

      if (date && isNaN(Date.parse(date as string))) {
        res.status(400).send({ error: "Invalid date format" });
      }

      if (!date && !name && !status && !phone_number) {
        res.status(400).send({ error: "Bad request invalid parameter" });
      }

      const firstname = name ? (name as string).split(" ")[0] : null;
      const lastname = name ? (name as string).split(" ")[1] : null;

      const result: any = await appointmentService.getDoctorAppointmentByParameter(
        date as string,
        firstname as string,
        lastname as string,
        status as string,
        phone_number as string
      );
      res.status(result.status).send(result);

    } catch (err: any) {
      res.status(500).send({ error: "An unexpected error occurred while fetching doctor appointment:" + err.message });
    }
  }

  //  update การจอง ทั้งหมอและ คนไข้
  //  รับ UID เพื่อ หา และ อัพเดทข้อมูล
  async updateDoctorAppointment(req: Request, res: Response) {
    try {
      const result: any = await appointmentService.updateDoctorAppointment(req.body);

      res.status(result.status).send(result);
    } catch (err: any) {
      res.status(500).send({ error: "An unexpected error occurred while updating doctor appointment controller:" + err.message });
    }
  }

  async cancelDoctorAppointment(req: Request, res: Response) {
    try {
      console.log(req.body);
      const result = await appointmentService.cancelAppointment(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }

  async getPatientAppointment(req: Request, res: Response): Promise<any> {
    try {
      const { phoneNumber, firstname, lastname } = req.query;

      if (!phoneNumber && !firstname && !lastname) {
        return res.status(400).json({
          error: "Phone number, firstname, and lastname are required.",
        });
      }

      const status = await appointmentService.getPatientAppointment(
        phoneNumber as string,
        firstname as string,
        lastname as string
      );

      return res.status(200).json(status);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // อัพเดทข้อมูลการจอง ของคนไข้ update ได้หมด
  async updatePatientAppointment(req: Request, res: Response) {
    try {
      const result = await appointmentService.updatePatientAppointment(
        req.body
      );
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }

  //  delete (ยกเลิกการจอง) การจอง ทั้งหมอ
  //  รับ UID

  //  delete (ยกเลิกการจอง) การจอง ของคนไข้
  //  รับ firstname และ lastname
  async cancelAppointment(req: Request, res: Response) {
    try {
      const result: any = await appointmentService.cancelAppointment(req.body);
      res.status(result.status).send(result);
    } catch (err: any) {
      res.status(500).send({ error: "An unexpected error occurred while canceling appointment controller:" + err.message });
    }
  }
}
export const appointmentController = new AppointmentController();
