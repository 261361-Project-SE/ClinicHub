import express, { Router } from "express";
import { appointmentController } from "./appointment.controller";
const router: Router = express.Router();

// Doctor routes
router.get("/doctor/appointment", appointmentController.getDoctorAppointment);
router.patch("/doctor/appointment/update", appointmentController.updateDoctorAppointment);
// router.patch("/doctor/appointment/status/update", appointmentController.updateDoctorAppointmentStatus);

// Patient routes
router.get("/patient/appointment", appointmentController.getPatientAppointment);
router.patch("/patient/appointment/update", appointmentController.updatePatientAppointment);

// Shared route
router.post("/appointment/create", appointmentController.createAppointment);
router.delete("/appointment/cancel", appointmentController.cancelAppointment);

// Get appointment time slot
router.get("/appointment/time-slot", appointmentController.getAppointmentTimeSlot);

export default router;

