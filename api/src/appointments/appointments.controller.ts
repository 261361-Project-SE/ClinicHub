import { Request, Response } from "express";
import { appointmentService } from "./appointments.service";

class AppointmentsController {
  constructor() { }

  async getAllAppointment(req: Request, res: Response) {
    try {
      const result = await appointmentService.getRecord();
      res.status(200).send(result);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error whiel get all appointment");
    }
  }

  async createAppointment(req: Request, res: Response) {
    try {
      const result = await appointmentService.createAppointment(req.body);
      res.status(200).send(result);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error while create appointment");
    }
  }
}

export const appointmentsController = new AppointmentsController();
