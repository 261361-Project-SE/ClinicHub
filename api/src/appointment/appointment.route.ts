import express, { Router } from "express";
import { appointmentController } from "./appointment.controller";
const router: Router = express.Router();

// Doctor routes
router.get("/doctor/appointment", appointmentController.getDoctorAppointment);
router.patch("/doctor/appointment/update", appointmentController.updateDoctorAppointment);

// Patient routes
router.get("patient/appointment", appointmentController.getPatientAppointment);
router.patch("/patient/appointment/update", appointmentController.updatePatientAppointment);

// Shared route
router.post("/appointment/create", appointmentController.createAppointment);
router.delete("/appointment/cancel", appointmentController.cancelAppoitnment);

export default router;

