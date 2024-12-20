import e, { Request, Response } from "express";
import { Status } from "@prisma/client";
import { appointmentService } from "./appointment.service";

const validateDateTimeFormat = (dateTime: string): boolean => {
  const dateTimeFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/;
  return dateTimeFormat.test(dateTime);
}


class AppointmentController {
  constructor() { }

  // สร้างการจอง ทั้งหมอและ คนไข้
  async createAppointment(req: Request, res: Response) {
    try {

      const { firstname, lastname, phone_number, symptom, appointment_dateTime } = req.body;

      if (!firstname || !lastname || !phone_number || !symptom || !appointment_dateTime) {
        res.status(400).send({ error: "Missing required fields", status: 400 });
        return;
      }

      if (appointment_dateTime && !validateDateTimeFormat(appointment_dateTime)) {
        res.status(400).send({ error: "Appointment date time is invalid", status: 400 });
        return;
      }

      const result: any = await appointmentService.creteBooking(firstname, lastname, phone_number, symptom, appointment_dateTime);
      if (result.error) {
        res.status(result.status).send(result);
      } else {
        res.status(200).send(result);
      }

    } catch (err: any) {
      res.status(500).send({ error: "An unexpected error occurred while creating appointment controller:" + err.message, status: 500 });
    }
  }

  // ดู การจองทั้งหมด หมอ
  async getDoctorAppointment(req: Request, res: Response) {
    try {
      const { date, name, status, phone_number } = req.query;

      if (!date && !name && !status && !phone_number) {
        const result: any = await appointmentService.getDoctorAppointmentAll();
        if (result.error) {
          res.status(result.status).send(result);
        } else {
          res.status(200).send(result);
        }
        return;
      }

      if (date && isNaN(Date.parse(date as string))) {
        res.status(400).send({ error: "Invalid date format" });
        return;
      }

      if (!date && !name && !status && !phone_number) {
        res.status(400).send({ error: "Bad request invalid parameter" });
        return;
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
      if (result.error) {
        res.status(result.status).send(result);
      } else {
        res.status(200).send(result);
      }

    } catch (err: any) {
      res.status(500).send({ error: "An unexpected error occurred while fetching doctor appointment:" + err.message });
    }
  }

  //  update การจอง ทั้งหมอและ คนไข้
  //  รับ UID เพื่อ หา และ อัพเดทข้อมูล
  async updateDoctorAppointment(req: Request, res: Response) {
    try {

      const { id, appointment_dateTime, status } = req.body;

      if (!id || !(appointment_dateTime || status)) {
        res.status(400).send({ error: "Missing required fields", status: 400 });
        return;
      }

      if (appointment_dateTime && !validateDateTimeFormat(appointment_dateTime)) {
        res.status(400).send({ error: "Appointment date time is invalid", status: 400 });
        return;
      }

      if (status && !Object.values(Status).includes(status as Status)) {
        res.status(400).send({ error: "Invalid status", status: 400 });
        return;
      }

      const result: any = await appointmentService.updateDoctorAppointment(id, appointment_dateTime, status);

      if (result.error) {
        res.status(result.status).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (err: any) {
      res.status(500).send({ error: "An unexpected error occurred while updating doctor appointment controller:" + err });
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

      if (!phoneNumber || !firstname || !lastname) {
        res.status(400).send({
          error: "Phone number, firstname, and lastname are required.",
        });
        return;
      }

      const record = await appointmentService.getPatientAppointment(
        phoneNumber as string,
        firstname as string,
        lastname as string
      );

      if (record.error) {
        res.status(record.status).send(record);
      } else {
        res.status(200).send(record);
      }
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  // อัพเดทข้อมูลการจอง ของคนไข้ update ได้หมด
  async updatePatientAppointment(req: Request, res: Response) {
    try {
      console.log(req.body);
      const { id, appointment_dateTime, symptom, firstname, lastname, phone_number } = req.body;

      if (!id || !(appointment_dateTime || symptom || firstname || lastname || phone_number)) {
        res.status(400).send({ error: "Missing required fields", status: 400 });
        return;
      }

      if (appointment_dateTime && !validateDateTimeFormat(appointment_dateTime)) {
        res.status(400).send({ error: "Appointment date time is invalid", status: 400 });
        return;
      }

      const result: any = await appointmentService.updatePatientAppointment(
        id,
        firstname,
        lastname,
        phone_number,
        appointment_dateTime,
        symptom
      );
      if (result.error) {
        res.status(result.status).send(result);
      } else {
        res.status(200).send(result);
      }
    } catch (err: any) {
      res.status(500).send({ error: "An unexpected error occurred while updating patient appointment controller:" + err.message });
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
