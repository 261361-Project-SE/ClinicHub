import { Request, Response } from "express";
import { appointmentService } from "./appointment.service";
const express = require("express");

enum Status {
  Completed,
  Confirmed,
  Pending,
  Requesting,
  Canceled
}

class AppointmentController {
  constructor() { }

  // สร้างการจอง ทั้งหมอและ คนไข่
  async createAppointment(req: Request, res: Response) {
    try {
      const result = await appointmentService.creteBooking(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }

  // ดู การจองทั้งหมด หมอ
  async getDoctorAppointment(req: Request, res: Response): Promise<any> {
    try {
      const { date, firstname, lastname, status, phone_number } = req.query;

      let result;

      if (!date && !firstname && !lastname && !status && !phone_number) {
        result = await appointmentService.getDoctorAppointmentAll();
      } else if (date) {
        result = await appointmentService.getDoctorAppointmentDate(date as string);
      } else if (firstname || lastname) {
        result = await appointmentService.getDoctorAppointmentName(firstname as string, lastname as string);
      } else if (status) {
        result = await appointmentService.getDoctorAppointmentStatus(status as string);
      } else if (phone_number) {
        result = await appointmentService.getDoctorAppointmentPhoneNumber(phone_number as string);
      } else {
        res.status(400).send({ error: "Bad request" });
        return;
      }

      res.status(200).send(result);
    } catch (err: any) {
      res.status(500).send({ error: err.message });
    }
  }

  //  update การจอง ทั้งหมอและ คนไข่
  //  รับ UID เพื่อ หา และ อัพเดทข้อมูล
  async updateDoctorAppointment(req: Request, res: Response) {
    try {
      const result = await appointmentService.updateDoctorAppointment(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(500).send({ error: err.message });
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

  // อัพเดทข้อมูลการจอง ของคนไข่ update ได้หมด
  async updatePatientAppointment(req: Request, res: Response) {
    try {
      const result = await appointmentService.updatePatientAppointment(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }

  //  delete (ยกเลิกการจอง) การจอง ทั้งหมอ
  //  รับ UID


  //  delete (ยกเลิกการจอง) การจอง ของคนไข่
  //  รับ firstname และ lastname
  async cancelAppoitnment(req: Request, res: Response) {
    try {
      const result = await appointmentService.cancelAppointment(req.body);
      res.status(200).send(result);
    } catch (err: any) {
      res.status(400).send({ error: err.message });
    }
  }
}
export const appointmentController = new AppointmentController();
